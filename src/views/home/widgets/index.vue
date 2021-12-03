<template>
	<div :class="['widgets-home', customizing?'customizing':'']" ref="main">
		<div class="widgets-content">
			<div class="widgets-top">
				<div class="widgets-top-title">
					控制台
				</div>
			</div>
			<div class="widgets" ref="widgets">
				<el-card shadow="hover" header="时钟" class="item-background">
					<div class="time">
						<h2>{{ time }}</h2>
						<p>{{ day }}</p>
					</div>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				customizing: false,
				time: '',
				day: ''
			}
		},
		created(){},
		mounted() {
			this.$emit('on-mounted')
			this.showTime()
			setInterval(()=>{
				this.showTime()
			},1000)
		},
		methods: {
			showTime(){
				this.time = this.$TOOL.dateFormat(new Date(), 'hh:mm:ss')
				this.day = this.$TOOL.dateFormat(new Date(), 'yyyy年MM月dd日')
			}
		}
	}
</script>

<style scoped lang="scss">
	.widgets-home {display: flex;flex-direction: row;flex: 1;height: 100%;}
	.widgets-content {flex: 1;overflow: auto;overflow-x:hidden;padding:15px;}
	.widgets-top {margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;}
	.widgets-top-title {font-size: 18px;font-weight: bold;}
	.widgets {transform-origin: top left;transition: transform .15s;}
	[data-theme=dark] {
		.widgets-aside {background: #2b2b2b;}
		.customize-overlay {background: rgba(43,43,43,0.9);}
	}
	.item-background {background: linear-gradient(to right, #8E54E9, #4776E6);color: #fff;}
	.time h2 {font-size: 40px;}
	.time p {font-size: 14px;margin-top: 13px;opacity: 0.7;}
	@media (max-width: 992px){
		.customizing .widgets {transform: scale(1) !important;}
		.customizing .widgets-wrapper {margin-right:0;}
	}

</style>
