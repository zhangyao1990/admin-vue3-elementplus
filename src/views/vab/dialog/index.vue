<!--
 * @Descripttion: zyDialog 弹窗扩展演示文件
 * @version: 1.0
 * @Author: zhangyao
 * @Date: 2021年8月27日08:56:30
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-alert title="二次封装el-dialog,加入拖拽/加载中/最大化." type="success" style="margin:0 0 20px 0;"></el-alert>
		<el-card shadow="never" header="内置">
			<el-button type="primary" @click="open1">默认</el-button>
			<el-button type="primary" @click="open2">加载</el-button>
		</el-card>
	</el-main>

	<zy-dialog v-model="dialog1" title="提示">
		内容
		<template #footer>
			<el-button @click="dialog1 = false">取 消</el-button>
			<el-button type="primary" @click="dialog1 = false">确 定</el-button>
		</template>
	</zy-dialog>

	<zy-dialog v-model="dialog2" title="模拟加载" :width="400" :loading="dialog2Loading">
		<el-empty description="NO Data" :image-size="80"></el-empty>
		<template #footer>
			<el-button @click="dialog2 = false">取 消</el-button>
			<el-button type="primary" @click="dialog2 = false" :loading="dialog2Loading">确 定</el-button>
		</template>
	</zy-dialog>
</template>

<script>
	export default {
		name: 'dialogExtend',
		data() {
			return {
				dialog1: false,
				dialog2: false,
				dialog2Loading: false,
			}
		},
		mounted() {

		},
		methods: {
			open1(){
				this.dialog1 = true
			},
			open2(){
				this.dialog2 = true
				this.dialog2Loading = true
				setTimeout(()=>{
					this.dialog2Loading = false
				}, 1000)
			}
		}
	}
</script>

<style>
</style>
