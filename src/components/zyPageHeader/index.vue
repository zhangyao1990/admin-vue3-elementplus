<!--
 * @Descripttion: 页面头部样式组件
 * @version: 1.0
 * @Author: zhangyao
 * @Date: 2021年7月20日08:49:07
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<div class="zy-page-header">
		<div v-if="icon" class="zy-page-header__icon">
			<span>
				<i :class="icon"></i>
			</span>
		</div>
		<div class="zy-page-header__title">
			<h2>{{ title }}</h2>
			<p v-if="description || $slots.default">
				<slot>
				{{ description }}
				</slot>
			</p>
		</div>
		<div v-if="$slots.main" class="zy-page-header__main">
			<slot name="main"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: { type: String, required: true, default: "" },
			description: { type: String, default: "" },
			icon: { type: String, default: "" },
		}
	}
</script>

<style scoped>
	.zy-page-header {background: #fff;border-bottom: 1px solid #e6e6e6;padding:20px 25px;display: flex;}
	.zy-page-header__icon {width: 50px;}
	.zy-page-header__icon span {display: inline-block;width: 30px;height: 30px;background: #409EFF;border-radius: 40%;display: flex;align-items: center;justify-content: center;}
	.zy-page-header__icon span i {color: #fff;font-size: 14px;}
	.zy-page-header__title {flex: 1;}
	.zy-page-header__title h2 {font-size: 17px;color: #3c4a54;font-weight: bold;margin-top: 3px;}
	.zy-page-header__title p {font-size: 13px;color: #999;margin-top: 15px;}

	[data-theme='dark'] .zy-page-header {background:#2b2b2b ;border-color:var(--el-border-color-base);}
	[data-theme='dark'] .zy-page-header__title h2 {color: #d0d0d0;}
</style>
