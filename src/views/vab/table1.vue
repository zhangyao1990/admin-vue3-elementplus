<template>
	<el-container>
		<el-aside width="200px" v-loading="showGrouploading">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="groupFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="group" class="menu" node-key="id" :data="group" :current-node-key="''"
							 :highlight-current="true" :expand-on-click-node="false"
							 :filter-node-method="groupFilterNode" @node-click="groupClick"></el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container class="zyui-table">
			<search-form :search-arr="searchArr" @handleSearch="handleSearch" @onRefresh="onRefresh"/>
			<operationGroup @handleAdd="handleAdd" :operationGroupObj="operationGroupObj"
							@handleBatchOperation="handleBatchOperation"/>

			<el-main class="nopadding">
				<sub-table
					ref="table"
					:get-data-list="getDataList"
					:columns="columns"
					@handleBtnClick="handleBtnClick"
					@selectionChange="selectionChange"
				>
				</sub-table>
			</el-main>
		</el-container>
	</el-container>
	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSuccess" @closed="dialog.save=false"></save-dialog>
</template>
<script>
import saveDialog from './save'
import operationGroup from '@/components/operationGroup'
import searchForm from '@/components/SearchForm'
import subTable from '@/components/SubTable'

export default {
	name: 'user',
	components: {
		saveDialog, searchForm, operationGroup, subTable
	},
	data() {
		return {
			// searchForm start
			searchArr: [{
				key: 'title',
				value: '',
				label: '姓名',
				placeholder: '姓名',
				isText: true
			}, {
				key: 'code',
				value: '',
				label: '角色',
				placeholder: '角色',
				isAdvanced: true,
				isText: true
			}],
			// searchForm end
			// operationGrup start
			operationGroupObj: {
				isOperationLeft: true,
				leftGroupArr: [{
					type: 'primary',
					plain: true,
					isBatchOperation: true,
					btnText: '批量删除',
					mode: 'batchDel'
				}, {
					type: 'primary',
					isCreate: true,
					btnText: '添加',
					mode: 'add'
				}]
			},
			// operationGrup end
			// table start
			columns: [{
				type: 'selection',
				width: '50',
				fixed: 'left'
			}, {
				value: 'avatar',
				label: '头像',
				minwidth: '80',
				isImg: true
			}, {
				value: 'mail',
				label: '登录账号',
				minwidth: '145'
			}, {
				value: 'name',
				label: '姓名',
				minwidth: '145'
			}, {
				value: 'groupName',
				label: '角色',
				minwidth: '145'
			}, {
				value: 'date',
				label: '时间',
				minwidth: '145'
			}, {
				label: '操作',
				value: '',
				minwidth: '180',
				fixed: 'right',
				btns: [
					{
						name: '查看',
						btnType: 'text',
						clickType: 'details'
					},
					{
						name: '编辑',
						btnType: 'text',
						clickType: 'edit'
					}, {
						name: '删除',
						btnType: 'text',
						clickType: 'del'
					}]
			}],
			// table end
			// 加载数据方法 必须为 Promise 对象
			getDataList: (parameter, params) => {
				console.log('params', params)
				const queryPo = this.$TOOL.public.transformSearchData(this.searchArr)
				const searchParameter = {
					keyWord: queryPo.title || queryPo.code
				}
				let para = Object.assign({}, {
					page: parameter,
					searchParameter
				})
				console.log('para', para)
				if (queryPo && queryPo.priceArr) {
					// if (queryPo.priceArr[0].length && queryPo.priceArr[1].length) {
					// 	para.priceMin = accMul(queryPo.priceArr[0], 100)
					// 	para.priceMax = accMul(queryPo.priceArr[1], 100)
					// }
				}
				// 获取数据列表
				return this.$API.system.user.list.get()
			},
			selectionVal: [], // 已选中的行

			dialog: {
				save: false
			},
			showGrouploading: false,
			groupFilterText: '',
			group: [],
			apiObj: this.$API.system.user.list,
			search: {
				name: null
			}
		}
	},
	watch: {
		groupFilterText(val) {
			this.$refs.group.filter(val);
		}
	},
	mounted() {
		this.getGroup()
	},
	methods: {
		//加载树数据
		async getGroup() {
			this.showGrouploading = true;
			var res = await this.$API.system.role.list.get();
			this.showGrouploading = false;
			var allNode = {id: '', label: '所有'}
			res.data.unshift(allNode);
			this.group = res.data;
		},
		//树过滤
		groupFilterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		//树点击事件
		groupClick(data) {
			var params = {
				groupId: data.id
			}
			this.$refs.table.refresh(true, params)
		},
		// 搜索
		handleSearch(queryPara) {
			console.log('queryPara', queryPara)
			this.$nextTick(() => {
				this.$refs.table.refresh(true)
			})
		},
		// 重置
		onRefresh(params) {
			this.$nextTick(() => {
				this.$refs.table.refresh(true, params)
			})
		},
		// 批量操作
		handleBatchOperation(row) {
			if (this.selectionVal && this.selectionVal.length > 0) {
				console.log('row', row)
				console.log('this.selectionVal', this.selectionVal)
				if (row.mode === "batchDel") {
					this.batch_del() // 批量删除
				}
			} else {
				this.$message.info("请选择一条数据")
			}
		},
		handleAdd(row) {
			console.log('row', row)
			this.add()
		},
		// 表格内按钮点击事件
		async handleBtnClick(dataVal) {
			if (dataVal.clickType === 'edit') {
				console.log('dataVal', dataVal)
				this.table_edit(dataVal.row)
			}
			if (dataVal.clickType === 'del') {
				console.log('dataVal', dataVal)
				this.table_del(dataVal.row, dataVal.vIndex)
			}
			if (dataVal.clickType === 'details') {
				console.log('dataVal', dataVal)
				this.table_show(dataVal.row)
			}
		},
		//本地更新数据
		handleSuccess(data, mode) {
			if (mode == 'add') {
				data.id = new Date().getTime()
				this.$refs.table.tableDataList.unshift(data)
			} else if (mode == 'edit') {
				this.$refs.table.tableDataList.filter(item => item.id === data.id).forEach(item => {
					Object.assign(item, data)
				})
			}
		},
		//添加
		add() {
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open()
			})
		},
		//编辑
		table_edit(row) {
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open('edit').setData(row)
			})
		},
		//查看
		table_show(row) {
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open('show').setData(row)
			})
		},
		//删除
		table_del(row, index) {
			var reqData = {id: row.id}
			this.$confirm(`确定删除吗？`, '提示', {
				type: 'warning'
			}).then(async () => {
				var res = await this.$API.system.post.post(reqData);
				if (res.code == 200) {
					//这里选择刷新整个表格 OR 插入/编辑现有表格数据
					this.$refs.table.tableDataList.splice(index - 1, 1)
					this.$message.success("删除成功")
				} else {
					this.$alert(res.message, "提示", {type: 'error'})
				}
			}).catch(() => {

			})

		},
		//批量删除
		async batch_del() {
			this.$confirm(`确定删除选中的 ${this.selectionVal.length} 项吗？`, '提示', {
				type: 'warning'
			}).then(() => {
				const loading = this.$loading();
				this.selectionVal.forEach(item => {
					this.$refs.table.tableDataList.forEach((itemI, indexI) => {
						if (item.id === itemI.id) {
							this.$refs.table.tableDataList.splice(indexI, 1)
						}
					})
				})
				loading.close();
				this.$message.success("操作成功")
			}).catch(() => {

			})
		},
		//表格选择后回调事件
		selectionChange(selectionVal) {
			this.selectionVal = selectionVal;
		},
	}
}
</script>

<style>
.zyui-table {
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
}
</style>
