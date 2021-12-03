<template>
	<div class="zyui-topbar">
		<div class="left-panel">
			<div v-if="isFold" class="menu-collapse hidden-sm-and-down" @click="$store.commit('TOGGLE_menuIsCollapse')">
				<i class="el-icon-s-fold"></i>
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="hidden-sm-and-down zyui-breadcrumb">
				<transition-group name="breadcrumb" mode="out-in">
					<template v-for="item in breadList" :key="item.title">
						<el-breadcrumb-item v-if="item.path!='/' &&  !item.meta.hiddenBreadcrumb"
											:key="item.meta.title">{{item.meta.title}}
						</el-breadcrumb-item>
					</template>
				</transition-group>
			</el-breadcrumb>
		</div>
		<div class="center-panel"></div>
		<div class="right-panel">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import {compile} from 'path-to-regexp'

	export default {
		data() {
			return {
				breadList: [],
				isFold: true
			}
		},
		created() {
			this.getBreadcrumb();
			console.log('compile', compile)
		},
		watch: {
			$route() {
				this.getBreadcrumb();
			}
		},
		methods: {
			getBreadcrumb() {
				let matched = this.$route.meta.breadcrumb;
				this.breadList = matched;
				this.isFold = this.breadList && !this.breadList[0].children && this.isFold ? false : true


			}
		}
	}
</script>

<style scoped>

	.zyui-topbar {
		height: 56px;
		background: #ffffff;
		box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
		display: flex;
		justify-content: space-between;
	}

	.zyui-topbar .left-panel {
		display: flex;
		align-items: center;
	}

	.zyui-topbar .right-panel {
		display: flex;
		align-items: center;
	}

	.zyui-topbar .left-panel .zyui-breadcrumb {
		margin-left: 10px;
	}

	.right-panel-search {
		display: flex;
		align-items: center;
	}

	.right-panel-search > * + * {
		margin-left: 10px;
	}

	.zyui-topbar .menu-collapse {
		height: 50px;
		width: 60px;
		display: flex;
		align-items: center;
		cursor: pointer;
		padding: 0 0 0 10px;
	}

	.zyui-topbar .menu-collapse i {
		font-size: 16px;
	}

	.zyui-topbar .menu-collapse:hover {
		background-image: linear-gradient(90deg, #d9ecff, transparent);
	}

	.breadcrumb-enter-active, .breadcrumb-leave-active {
		transition: all 0.3s;
	}

	.breadcrumb-enter-from, .breadcrumb-leave-active {
		opacity: 0;
		transform: translateX(20px);
	}

	.breadcrumb-leave-active {
		position: absolute;
	}
</style>
