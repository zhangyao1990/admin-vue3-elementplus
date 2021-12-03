<template>
	<!-- 通栏布局 -->
	<template v-if="layout=='header'">
		<header class="zyui-header">
			<div class="zyui-header-left">
				<div class="logo-bar">
					<img class="logo" src="img/logo.png">
					<span>{{ $CONFIG.APP_NAME }}</span>
				</div>
				<ul v-if="!ismobile" class="nav">
					<li v-for="item in menu" :key="item" :class="pmenu.path==item.path?'active':''"
						@click="showMenu(item)">
						<i :class="item.meta.icon || 'el-icon-menu'"></i>
						<span>{{ item.meta.title }}</span>
					</li>
				</ul>
			</div>
			<div class="zyui-header-right">
				<userbar></userbar>
			</div>
		</header>
		<section class="zyui-wrapper">
			<div v-if="!ismobile" :class="!menuIsCollapse&&nextMenu.length>0?'zyui-side':'zyui-side isCollapse'">
				<div class="zyui-side-top">
					<h2>{{ pmenu.meta.title }}</h2>
				</div>
				<div class="zyui-side-scroll">
					<el-scrollbar>
						<el-menu :default-active="active" router :collapse="menuIsCollapse"
								 :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
							<NavMenu :navMenus="nextMenu"></NavMenu>
						</el-menu>
					</el-scrollbar>
				</div>
			</div>
			<Side-m v-if="ismobile"></Side-m>
			<div class="zyui-body el-container">
				<Topbar v-if="!ismobile"></Topbar>
				<Tags v-if="!ismobile && layoutTags"></Tags>
				<div class="zyui-main" id="zyui-main">
					<router-view v-slot="{ Component }">
						<keep-alive :include="this.$store.state.keepAlive.keepLiveRoute">
							<component :is="Component" :key="$route.fullPath" v-if="$store.state.keepAlive.routeShow"/>
						</keep-alive>
					</router-view>
					<iframe-view></iframe-view>
				</div>
			</div>
		</section>
	</template>

	<!-- 经典布局 -->
	<template v-else-if="layout=='menu'">
		<header class="zyui-header">
			<div class="zyui-header-left">
				<div class="logo-bar">
					<img class="logo" src="img/logo.png">
					<span>{{ $CONFIG.APP_NAME }}</span>
				</div>
			</div>
			<div class="zyui-header-right">
				<userbar></userbar>
			</div>
		</header>
		<section class="zyui-wrapper">
			<div v-if="!ismobile" :class="!menuIsCollapse&&nextMenu.length>0?'zyui-side':'zyui-side isCollapse'">
				<div class="zyui-side-scroll">
					<el-scrollbar>
						<el-menu :default-active="active" router :collapse="menuIsCollapse"
								 :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
							<NavMenu :navMenus="menu"></NavMenu>
						</el-menu>
					</el-scrollbar>
				</div>
			</div>
			<Side-m v-if="ismobile"></Side-m>
			<div class="zyui-body el-container">
				<Topbar v-if="!ismobile"></Topbar>
				<Tags v-if="!ismobile && layoutTags"></Tags>
				<div class="zyui-main" id="zyui-main">
					<router-view v-slot="{ Component }">
						<keep-alive :include="this.$store.state.keepAlive.keepLiveRoute">
							<component :is="Component" :key="$route.fullPath" v-if="$store.state.keepAlive.routeShow"/>
						</keep-alive>
					</router-view>
					<iframe-view></iframe-view>
				</div>
			</div>
		</section>
	</template>

	<!-- 默认布局 -->
	<template v-else>
		<section class="zyui-wrapper">

			<div v-if="!ismobile" class="zyui-side-split">
				<div class="zyui-side-split-scroll">
					<el-scrollbar>
						<div class="logo">
							<img src="img/logo.png">
						</div>
						<ul>
							<li v-for="item in menu" :key="item" :class="pmenu.path==item.path?'active':''"
								@click="showMenu(item)">
								<i :class="item.meta.icon || 'el-icon-menu'"></i>
								<p>{{ item.meta.title }}</p>
							</li>
						</ul>
					</el-scrollbar>
				</div>
			</div>
			<div v-if="!ismobile" :class="!menuIsCollapse&&nextMenu.length>0?'zyui-side':'zyui-side isCollapse'">
				<div class="zyui-side-top">
					<h2>{{ pmenu.meta.title }}</h2>
				</div>
				<div class="zyui-side-scroll">
					<el-scrollbar>
						<el-menu class="zyui-menu-columns" :default-active="active" router
								 :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
							<NavMenu :navMenus="nextMenu"></NavMenu>
						</el-menu>
					</el-scrollbar>
				</div>
			</div>
			<Side-m v-if="ismobile"></Side-m>
			<div class="zyui-body el-container">
				<Topbar>
					<userbar></userbar>
				</Topbar>
				<Tags v-if="!ismobile && layoutTags"></Tags>
				<div class="zyui-main" id="zyui-main">
					<router-view v-slot="{ Component }">
						<keep-alive :include="this.$store.state.keepAlive.keepLiveRoute">
							<component :is="Component" :key="$route.fullPath" v-if="$store.state.keepAlive.routeShow"/>
						</keep-alive>
					</router-view>
					<iframe-view></iframe-view>
				</div>
			</div>
		</section>
	</template>

	<div class="layout-setting" @click="openSetting"><i class="el-icon-brush"></i></div>

	<el-drawer title="布局实时演示" v-model="settingDialog" :size="400" append-to-body destroy-on-close>
		<setting></setting>
	</el-drawer>
</template>

<script>
	import SideM from './components/sideM.vue';
	import Topbar from './components/topbar.vue';
	import Tags from './components/tags.vue';
	import NavMenu from './components/NavMenu.vue';
	import userbar from './components/userbar.vue';
	import setting from './components/setting.vue';
	import iframeView from './components/iframeView.vue';

	export default {
		name: 'index',
		components: {
			SideM,
			Topbar,
			Tags,
			NavMenu,
			userbar,
			setting,
			iframeView
		},
		data() {
			return {
				settingDialog: false,
				menu: [],
				nextMenu: [],
				pmenu: {},
				active: ''
			}
		},
		computed: {
			ismobile() {
				return this.$store.state.global.ismobile
			},
			layout() {
				return this.$store.state.global.layout
			},
			layoutTags() {
				return this.$store.state.global.layoutTags
			},
			menuIsCollapse() {
				return this.$store.state.global.menuIsCollapse
			}
		},
		created() {
			this.onLayoutResize();
			window.addEventListener('resize', this.onLayoutResize);
			var menu = this.$TOOL.data.get("MENU");
			this.menu = this.filterUrl(menu);
			this.showThis()
		},
		watch: {
			$route() {
				this.showThis()
			},
			layout: {
				handler(val) {
					document.body.setAttribute('data-layout', val)
				},
				immediate: true,
			}
		},
		methods: {
			openSetting() {
				this.settingDialog = true;
			},
			onLayoutResize() {
				const clientWidth = document.body.clientWidth;
				if (clientWidth < 992) {
					this.$store.commit("SET_ismobile", true)
				} else {
					this.$store.commit("SET_ismobile", false)
				}
			},
			//路由监听高亮
			showThis() {
				this.pmenu = this.$route.meta.breadcrumb ? this.$route.meta.breadcrumb[0] : {}
				this.nextMenu = this.filterUrl(this.pmenu.children);
				this.$nextTick(() => {
					this.active = this.$route.meta.active || this.$route.fullPath;
				})
			},
			//点击显示
			showMenu(route) {
				if (this.menuIsCollapse) {
					this.$store.commit("TOGGLE_menuIsCollapse", false)
				}
				if (route.path === this.pmenu.path) {
					return
				}
				this.pmenu = route;
				this.nextMenu = this.filterUrl(route.children);

				if (!route.children && route.component) {
					this.$router.push({path: route.path})
				} else {
					this.$router.push({path: route.children[0].path})
				}
			},
			//转换外部链接的路由
			filterUrl(map) {
				var newMap = []
				map && map.forEach(item => {
					item.meta = item.meta ? item.meta : {};
					//处理隐藏
					if (item.meta.hidden) {
						return false
					}
					//处理http
					if (item.meta.type == 'iframe') {
						item.path = `/i/${item.name}`;
					}
					//递归循环
					if (item.children && item.children.length > 0) {
						item.children = this.filterUrl(item.children)
					}
					newMap.push(item)
				})
				return newMap;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.zyui-body {
		flex: 1;
		display: flex;
		flex-flow: column;
	}

	.logo {
		width: 65px;
		height: 56px;
		padding: 10px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		img {
			width: 32px;
		}
	}

	.zyui-side-split li.active:after {
		position: absolute;
		right: 0;
		width: 0;
		height: 0;
		overflow: hidden;
		content: "";
		border-color: transparent var(--el-color-white) transparent transparent;
		border-style: solid dashed dashed;
		border-width: 8px;
	}
</style>
