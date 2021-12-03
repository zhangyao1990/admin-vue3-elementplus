<template>
	<div class="tags-box">
		<div class="zyui-tags" ref="tags">
			<el-tabs
				id="tagViewTab"
				v-model="currentTab"
				type="card"
				@tab-click="clickTab(currentTab)"
				@tab-remove="closeSelectedTag($route)"
			>
				<el-tab-pane
					ref="tags"
					v-for="item of tagList"
					:key="item.path"
					:label="item.meta.title"
					:name="item.fullPath"
					:closable="!isAffix(item)"
				/>
			</el-tabs>
		</div>
		<el-popover v-model:visible="contextMenuVisible" placement="left-start"
					popper-class="close-popover">
			<div style="text-align: right; margin: 0">
				<ul v-if="contextMenuVisible" class="contextmenu" id="contextmenu">
					<li @click="refreshTab()"><i class="el-icon-refresh"></i>刷新</li>
					<hr>
					<li @click="closeAll()" :class="contextMenuItem.meta.affix?'disabled':''"><i
						class="el-icon-close"></i>关闭所有
					</li>
					<li @click="closeOtherTabs()"
						:class="contextMenuItem.meta.affix||tagList.length<=2?'disabled':''"><i
						class="el-icon-folder-delete"></i>关闭其他
					</li>
					<hr>
					<li @click="screen()"><i class="el-icon-full-screen"></i>全屏当前标签</li>
				</ul>
			</div>
			<template #reference>
				<div class="zyui-close-tag" @click="openContextMenu($route)">
					<i class="el-icon-menu"></i>
				</div>
			</template>
		</el-popover>
	</div>
</template>

<script>
	export default {
		name: "tags",
		data() {
			return {
				contextMenuVisible: false,
				contextMenuItem: null,
				left: 0,
				top: 0,
				tagList: this.$store.state.viewTags.viewTags,
				currentTab: this.$route.fullPath
			}
		},
		props: {},
		watch: {
			$route(e) {
				this.addViewTags(e);
			},
			contextMenuVisible(value) {
				var _this = this;
				var cm = function (e) {
					let sp = document.getElementById("contextmenu");
					if (sp && !sp.contains(e.target)) {
						_this.closeMenu()
					}
				}
				if (value) {
					document.body.addEventListener('click', e => cm(e))
				} else {
					document.body.removeEventListener('click', e => cm(e))
				}
			}
		},
		created() {
			var menu = this.$TOOL.data.get("MENU")
			var dashboardRoute = this.treeFind(menu, node => node.path == this.$CONFIG.DASHBOARD_URL)
			dashboardRoute.fullPath = dashboardRoute.path
			this.addViewTags(dashboardRoute)
			this.addViewTags(this.$route)
		},
		methods: {
			//查找树
			treeFind(tree, func) {
				for (const data of tree) {
					if (func(data)) return data
					if (data.children) {
						const res = this.treeFind(data.children, func)
						if (res) return res
					}
				}
				return null
			},
			//增加tag
			addViewTags(route) {
				if (route.name && !route.meta.fullpage) {
					this.$store.commit("pushViewTags", route)
					this.$store.commit("pushKeepLive", route.name)
					this.currentTab = route.fullPath
				}
			},
			//高亮tag
			isActive(route) {
				return route.fullPath === this.$route.fullPath
			},
			//关闭tag
			closeSelectedTag(tag, autoPushLatestView = true) {
				this.$store.commit("removeViewTags", tag)
				this.$store.commit("removeIframeList", tag)
				this.$store.commit("removeKeepLive", tag.name)
				if (autoPushLatestView && this.isActive(tag)) {
					const latestView = this.tagList.slice(-1)[0]
					if (latestView) {
						this.$router.push(latestView)
					} else {
						this.$router.push('/')
					}
				}
			},
			//tag右键
			openContextMenu(tag) {
				this.contextMenuItem = tag;
				this.contextMenuVisible = true;
			},
			//关闭右键菜单
			closeMenu() {
				this.contextMenuItem = null;
				this.contextMenuVisible = false
			},
			//TAB 刷新
			refreshTab() {
				var nowTag = this.contextMenuItem;
				this.contextMenuVisible = false
				//判断是否当前路由，否的话跳转
				if (this.$route.fullPath != nowTag.fullPath) {
					this.$router.push({
						path: nowTag.fullPath,
						query: nowTag.query
					})
				}
				this.$store.commit("refreshIframe", nowTag)
				var _this = this;
				setTimeout(function () {
					_this.$store.commit("removeKeepLive", nowTag.name)
					_this.$store.commit("setRouteShow", false)
					_this.$nextTick(() => {
						_this.$store.commit("pushKeepLive", nowTag.name)
						_this.$store.commit("setRouteShow", true)
					})
				}, 0);
			},
			// 关闭除首页的有
			closeAll() {
				var nowTag = this.contextMenuItem;
				//判断是否当前路由，否的话跳转
				if (this.$route.fullPath != nowTag.fullPath) {
					this.$router.push({
						path: nowTag.fullPath,
						query: nowTag.query
					})
				}
				var tags = [...this.tagList];
				tags.forEach(tag => {
					if (tag.meta && tag.meta.affix) {
						this.$router.push('/')
						return true
					} else {
						this.closeSelectedTag(tag, false)
					}
				})
				this.contextMenuVisible = false
			},
			//TAB 关闭其他
			closeOtherTabs() {
				var nowTag = this.contextMenuItem;
				//判断是否当前路由，否的话跳转
				if (this.$route.fullPath != nowTag.fullPath) {
					this.$router.push({
						path: nowTag.fullPath,
						query: nowTag.query
					})
				}
				var tags = [...this.tagList];
				tags.forEach(tag => {
					if (tag.meta && tag.meta.affix || nowTag.fullPath == tag.fullPath) {
						return true
					} else {
						this.closeSelectedTag(tag, false)
					}
				})
				this.contextMenuVisible = false
			},
			//TAB 全屏标签
			screen() {
				var nowTag = this.contextMenuItem;
				this.contextMenuVisible = false
				//判断是否当前路由，否的话跳转
				if (this.$route.fullPath != nowTag.fullPath) {
					this.$router.push({
						path: nowTag.fullPath,
						query: nowTag.query
					})
				}
				var element = document.getElementById('zyui-main')
				this.$TOOL.screen(element)
			},

			clickTab(route) {
				this.$router.push({path: route})
			},
			isAffix(route) {
				return route.meta && route.meta.affix
			}
		}
	}
</script>

<style lang="scss">
	.contextmenu {
		margin: 0;
		border-radius: 3px;
		background: #fff;
		z-index: 3000;
		list-style-type: none;
		padding: 10px 0;
	}

	.contextmenu hr {
		margin: 5px 0;
		border: none;
		height: 1px;
		font-size: 0px;
		background-color: #ebeef5;
	}

	.contextmenu li {
		margin: 0;
		cursor: pointer;
		line-height: 30px;
		padding: 0 17px;
		color: #606266;
		text-align: left;
	}

	.contextmenu li i {
		font-size: 14px;
		margin-right: 10px;

	}

	.contextmenu li:hover {
		background-color: #ecf5ff;
		color: #66b1ff;
	}

	.contextmenu li.disabled {
		cursor: not-allowed;
		color: #bbb;
		background: transparent;
	}

	.tags-box {
		position: relative;
		background: #ffffff;
		border-bottom: 1px solid #ebeef5;
	}

	.zyui-tags {
		height: 34px;
		width: calc(100% - 25px);
	}


	.zyui-close-tag {
		position: absolute;
		right: 5px;
		top: 8px;
		display: flex;
		align-items: center;
		margin-left: 10px;
		cursor: pointer;
		font-size: 20px;
		font-weight: 500;
		transition: transform .3s ease-out;

	}

	.zyui-close-tag:hover {
		transform: rotate(45deg);

	}

</style>
