<!--isOperationLeft 是否显示左边-->
<!--isCreate 是否显示创建-->
<!--isDels 是否显示批量删除-->
<!--isBatchOperation 是否显示批量操作-->
<!--isRadioGroup 是否显示tab-btn-->
<!--tabPosition 默认值-->

<!--isOperationRight 是否显示右边-->
<!--isExportExcel excel导出按钮-->
<template>
	<div v-if="operationGroupObjData.isOperationLeft||operationGroupObjData.isOperationRight" class="operation-box">

		<div v-if="operationGroupObjData.isOperationLeft" class="btn-left-box">
			<template v-if="operationGroupObjData.leftGroupArr.length>0">
				<div v-for="(item,index) in operationGroupObjData.leftGroupArr" :key="index" class="btn-left">
					<slot name="btnName"/>
					<el-button v-if="item.isCreate" size="mini" :icon="item.icon||'el-icon-plus'"
							   :type="item.type||''"
							   :plain="item.plain||false"
							   @click="handleAdd(item)">
						{{ item.btnText || '新增' }}
					</el-button>
					<!--<el-button v-if="item.isDels" v-waves size="small" :icon="item.icon||''" :type="item.type||''" @click="handleDels(item)">-->
					<!--{{ item.btnText||'批量删除' }}-->
					<!--</el-button>-->
					<el-button v-if="item.isBatchOperation" size="mini" :icon="item.icon||''"
							   :type="item.type||''"
							   :plain="item.plain||true"
							   @click="handleBatchOperation(item)">
						{{ item.btnText || '批量操作' }}
					</el-button>
					<el-radio-group v-if="item.isRadioGroup" v-model="operationGroupObjData.tabPosition" size="mini"
									@change="handleSearchRadioGroup">
						<template>
							<el-radio-button v-for="(j,index) in item.list" :key="index" style="margin-bottom: 5px;"
											 border :label="j.value">
								{{ j.label }}
							</el-radio-button>
						</template>
					</el-radio-group>
				</div>
			</template>
		</div>
		<div v-if="operationGroupObjData.isOperationRight" class="btn-right-box">
			<div v-for="(item,index) in operationGroupObjData.rightGroupArr" :key="index" class="btn-right">
				<el-button v-if="item.isRightBtn" size="mini" :type="item.type||''"
						   @click="handleRightBtn(item)">
					{{ item.btnText || '导出' }}
				</el-button>
			</div>
			<!--指定时间查询-->
			<div class="radio-group-text-box"
				 v-if="operationGroupObjData.quickSearch && operationGroupObjData.quickSearch.isShow">
				<template v-if="operationGroupObjData.quickSearch.isMonthShow">
					<el-radio-group class="radio-group-text" v-model="rangeAll" size="mini"
									:text-color="theme" fill="#fff"
									@change="handleChangeAll" v-if="!operationGroupObjData.quickSearch.isHideAll">
						<el-radio-button :label="1">全部</el-radio-button>
					</el-radio-group>
					<el-radio-group class="radio-group-text" v-model="timeRange" fill="#fff" size="mini"
									:text-color="theme"
									@change="handleChangeTime" v-if="!operationGroupObjData.quickSearch.hideTime">
						<el-radio-button label="2">本周</el-radio-button>
						<el-radio-button label="3">本月</el-radio-button>
						<el-radio-button label="4">上月</el-radio-button>
						<el-radio-button label="5">本年度</el-radio-button>
					</el-radio-group>
				</template>
				<template v-if="operationGroupObjData.quickSearch.isDayShow">
					<el-radio-group class="radio-group-text" v-model="rangeAll" size="mini"
									:text-color="theme" fill="#fff"
									@change="handleChangeAll" v-if="!operationGroupObjData.quickSearch.isHideAll">
						<el-radio-button :label="1">全部</el-radio-button>
					</el-radio-group>
					<el-radio-group class="radio-group-text" v-model="timeRange" fill="#fff" size="mini"
									:text-color="theme"
									@change="handleChangeTime" v-if="!operationGroupObjData.quickSearch.hideTime">
						<el-radio-button label="2">今天</el-radio-button>
						<el-radio-button label="3">昨天</el-radio-button>
						<el-radio-button label="4">近7天</el-radio-button>
						<el-radio-button label="5">近30天</el-radio-button>
					</el-radio-group>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'operationGroup',
	props: {
		// 查询参数
		operationGroupObj: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			rangeAll: 1,
			timeRange: null,
			operationGroupObjData: {},
			theme: this.$TOOL.data.get('APP_THEME')
		}
	},
	created() {
		this.operationGroupObjData = this.operationGroupObj
	},
	methods: {

		// 显示新增界面
		handleAdd(item) {
			this.$emit('handleAdd', item) // 调用父组件的handleAdd方法
		},
		// 批量操作
		handleBatchOperation(item) {
			this.$emit('handleBatchOperation', item) // 调用父组件的handleBatchOperation方法
		},
		// 单选组合搜索
		handleSearchRadioGroup(val) {
			// console.log('val', val)
			this.$emit('handleSearchRadioGroup', val) // 调用父组件的handleBatchOperation方法
		},
		// Excel导出
		handleRightBtn(item) {
			this.$emit('handleRightBtn', item) // 调用父组件的handleExportExcel方法
		},
		handleChangeAll(val) {
			this.timeRange = null
			this.$emit('handleChangeAll', val)
		},
		handleChangeTime(val) {
			this.rangeAll = null;
			this.$emit('handleChangeTime', val)
		}
	}
}
</script>
<style lang="scss">
.el-radio-group {
	.el-radio-button {
		margin-bottom: 0 !important;
	}
}
</style>
<style lang="scss" scoped>
.operation-box {
	padding: 10px 0 10px 8px;
	//background-color: #f3f3f3;
	display: flex;
	justify-content: space-between;

	.btn-left-box {
		display: flex;

		.btn-left {
			margin-right: 8px;
		}
	}

	.btn-right-box {
		display: flex;
		margin-right: 10px;

		.btn-right {
			margin-right: 8px;
		}
	}
}
</style>

