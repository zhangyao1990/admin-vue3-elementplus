<!--column.type 'selection' 多选 -->
<template>
	<div class="com-table">
		<div v-if="title" class="com-table-title">{{ title }}</div>
		<div :class="[title?'com-table-content':'com-table-content-nottitle']">
			<el-table
				ref="multipleTable"
				v-loading="isLoading"
				element-loading-text="拼命加载中"
				element-loading-spinner="el-icon-loading"
				:data="tableDataList"
				:row-key="getRowKeys"
				border
				style="width: 100%;"
				@sort-change="sort_change"
				@selection-change="handleSelectionChange"
			>
				<template v-for="(column) in columns">
					<!--:selectable="selectable" 禁用部分多选-->
					<el-table-column
						v-if="column.type"
						:key="column.label"
						:type="column.type"
						:reserve-selection="true"
						:align="column.align||'center'"
						:label="column.label"
						:width="column.width==undefined?'100':column.width"
						:sortable="column.sortable?'custom':false"
						:fixed="column.fixed">
					</el-table-column>
					<el-table-column
						v-if="!column.type"
						:key="column.label"
						:align="column.align||'center'"
						:reserve-selection="true"
						:prop="column.value"
						:label="column.label"
						:width="column.width==undefined?'auto':column.width"
						:min-width="column.minwidth==undefined?'auto':column.minwidth"
						:sortable="column.sortable?'custom':false"
						:fixed="column.fixed"
						:show-overflow-tooltip="column.tooltip?true:false"
					>
						<template v-slot="scope">
							<slot
								v-if="column.slotBool"
								:name="column.value"
								:slotname="column.value"
								:index="scope.$index"
								:row="scope.row"
							/>
							<div v-else-if="column.isImg" class="table-img">
								<!--                <img :src="scope.row[column.value]" alt/>-->
								<el-image
									:src="scope.row[column.value]"
									:preview-src-list="[scope.row[column.value]]"
									fit="contain"
									lazy
									class="el-avatar"
								>
									<template #error>
										<div class="image-slot">
											<i class="el-icon-picture-outline"></i>
											暂无图片
										</div>
									</template>
								</el-image>
							</div>
							<div
								v-else-if="column.templet!=undefined && typeof column.templet == 'function' && column.templet(scope.row)"
								:style="'text-align:center;text-decoration: underline;color:#ccc;'+column.style"
							>{{
									column.format ? fmtMoney(scope.row[column.value]) : scope.row[column.value]
								}}
							</div>
							<!--传入模板方法，方法返回true时显示灰色-->
							<div
								v-else-if="column.templet!=undefined && typeof column.templet == 'function' && !column.templet(scope.row)"
								:style="'color:#e60012;text-align:center;text-decoration: underline;'+column.style"
								@click="btnClickfunc(column,scope.row,column.value)"
							>{{
									column.format ? fmtMoney(scope.row[column.value]) : scope.row[column.value]
								}}
							</div>
							<!--传入模板方法，方法返回false时，可点击-->
							<div
								v-else-if="column.click"
								:style="'color:#e60012;text-align:center;text-decoration: underline;'+column.style"
								@click="btnClickfunc(column,scope.row,column.value)"
							>{{
									column.format ? fmtMoney(scope.row[column.value]) : scope.row[column.value]
								}}
							</div>
							<!--click为true可点击-->
							<div v-else-if="column.edit" :style="column.style">
								<!--edit为true可编辑，format金额格式化-->
								<el-input
									v-if="column.editType=='input'"
									v-model="scope.row[column.value]"
									placeholder="请输入内容"
									:disabled="scope.row.isDisabled"
									@change="editInput(scope.row)"
								/>
								<el-input-number placeholder="请输入内容"
												 v-if="column.editType=='numInput'"
												 v-model.number="scope.row[column.value]"
												 :step="column.addNum"
												 :precision="column.decimal"
												 :min="column.min"
												 :max="column.max"
												 :disabled="scope.row.isDisabled"
												 controls-position="right" style="width: 145px;text-align: left;"/>
								<el-select
									v-else-if="column.editType=='select'"
									v-model="scope.row[column.value]"
									size="mini"
									placeholder="请选择"
									@change="editInput(scope.row)"
								>
									<el-option
										v-for="item in column.editSelOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
							</div>
							<div v-else-if="column.btns" :style="'text-align:center;'+column.style">
								<!--表格内按钮，可点击，传入方法类型，用clickType区分按钮点击事件。-->
								<slot
									:name="column.value"
									:slotname="column.value"
									:index="scope.$index"
									:row="scope.row"
								/>
								<span v-for="(btn ,index) in column.btns" :key="index">
									<el-button
										:class="btn.btnClass"
										:type="btn.btnType"
										@click="handleBtnClick(btn.clickType, scope.row,index)"
									>
										{{ btn.name }}
									</el-button>
									<el-divider v-if="index<column.btns.length-1"
												direction="vertical"></el-divider>
								</span>
							</div>
							<div
								v-else
								:style="column.style"
								:class="column.tooltip?'btable-tooltip':''"
							>{{
									column.format ? fmtMoney(scope.row[column.value]) : scope.row[column.value]
								}}
							</div>
						</template>
					</el-table-column>
				</template>
				<template #empty>
					<el-empty :description="emptyText" :image-size="100"></el-empty>
				</template>
			</el-table>
		</div>
		<div class="zyTable-page" v-if="!hidePagination&&!hideDo">
			<div class="zyTable-pagination">
				<el-pagination background :small="true" @size-change="handleSizeChange"
							   :layout="paginationLayout"
							   :total="total"
							   :page-sizes="pageSizes"
							   :page-size="pageSize"
							   v-model:currentPage="currentPage"
							   @current-change="handleCurrentChange"></el-pagination>

			</div>
		</div>
	</div>
</template>
<script>
/**
 * table组件：
 * 传入data，columns
 * columns可传入模板函数，
 * 可定义单元格点击事件，
 * 可编辑，
 * 可选择，
 * 前台分页，
 * 前台排序，
 * 配置需要格式化的金额
 */
export default {
	name: "SubTable",
	props: {
		pageSizes: {
			// 分页规则
			type: Array,
			default: () => {
				return [10, 20, 40, 60, 80];
			}
		},
		hidePagination: {type: Boolean, default: false},
		hideDo: {type: Boolean, default: false},
		// 表格title
		title: {
			type: String,
			default: () => {
				return "";
			}
		},
		// 表格数据
		getDataList: {
			type: Function
		},
		// 表格展示数据列
		columns: {
			type: Array,
			default: () => []
		},
		paginationLayout: {type: String, default: "total, prev, pager, next, jumper"}
	},
	data() {
		return {
			getRowKeys(row) {
				return row.id;
			},
			isLoading: true,
			singleSelected: '',
			multipleSelection: [], // 当前页选中的数据
			localPagination: {}, // 重新加载
			tableDataList: [], // 表格数据
			sortVals: {}, // 排序
			emptyText: "暂无数据",
			currentPage: 1, // 页数索引
			pageSize: 10, // 每页显示的数量
			total: 0 // 总条数
		};
	},
	created() {
		this.loadData();
	},
	methods: {
		/**
		 * 表格重新加载方法
		 * 如果参数为 true, 则强制刷新到第一页
		 * @param Boolean bool
		 */
		refresh(bool = false, para) {
			if (bool) {
				this.currentPage = 1;
				this.pageSize = 10;
				this.total = 0;
				this.loadData(para);
				if (this.multipleSelection.length > 0) {
					if (this.$refs && this.$refs.multipleTable) {
						this.$refs.multipleTable.clearSelection();
					}
				}
			}
		},
		// 获取数据
		async loadData(para) {

			try {
				const parameter = Object.assign(
					{
						pageNo: this.currentPage,
						pageSize: this.pageSize
					},
					this.sortVals || {}
				);

				const {data = {}, code} = await this.getDataList(parameter, para);
				if (code === 200) {
					if (data) {
						this.$nextTick(() => {
							if (data instanceof Array) {
								this.tableDataList = data || [];
							} else if (data && data.rows instanceof Array) {
								this.tableDataList = data.rows || [];
								this.total = data.total;
							} else if (data && data.page && data.page.list instanceof Array) {
								this.tableDataList = data.page.list || [];
								this.total = data.page.count;
							} else {
								this.tableDataList = [];
							}
						});
					} else {
						this.tableDataList = [];
					}
					this.isLoading = false;
				}
			} catch (err) {
				console.log("err", err);
			}
		},
		fmtMoney(val) {
			// 格式化金额
			return val;
		},
		sort_change(param) {
			// 调用接口排序
			this.sortVals = Object.assign({isSort: true}, param);
			this.loadData();
		},

		// 点击每页显示数量时触发
		handleSizeChange: function (pagesize) {
			this.pageSize = pagesize;
			this.loadData();
		},
		// 翻页的时候触发
		handleCurrentChange: function (cur) {
			this.currentPage = cur;
			this.loadData();
		},
		// 表格内按钮点击
		btnClickfunc(column, row, clickType) {
			this.$emit("btnClickFunc", {column: column, row: row, type: clickType});
		},
		// 操作按钮点击
		handleBtnClick(clickType, row, index) {
			this.$emit("handleBtnClick", {clickType: clickType, row: row, vIndex: index});
			// this.$parent.printData();//直接调用父组件的方法
		},
		// 获取已选中的行
		handleSelectionChange(val) {
			// table组件选中事件,记得加上@selection-change="handleSelectionChange"
			this.multipleSelection = val;
			this.$emit("selectionChange", val);
		}
		,
		// 表格内输入框编辑触发
		editInput(row) {
			// console.log(row)
			if (this.$refs && this.$refs.multipleTable) {
				this.$refs.multipleTable.toggleRowSelection(row, true); // 选中所在行
			}
		}
		// 站内信部分多选禁用
		// selectable(row, index) {
		//   if (row.isRead === 1) {
		//     return false
		//   } else {
		//     return true
		//   }
		// }
	}
};
</script>
<style lang="scss" scoped>
.com-table {
	height: 100%;
	width: 100%;

	.com-table-title {
		color: #333;
		font-weight: bold;
		background-color: #f3f3f3;
		padding: 0;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		text-indent: 8px;
		border: 1px solid #ebeef5;
		border-bottom: 0;
	}

	.table-img {
		width: 60px;
		height: 60px;
		margin: 0 auto;
		border-radius: 5px;
		overflow: hidden;

		.el-avatar {
			width: 100%;
			height: 100%;
		}

		.image-slot {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			font-size: 13px;
			text-align: center;
			align-items: center;
		}
	}

	.com-table-content {
		width: 100%;
		height: calc(100% - 40px - 55px);
	}

	.com-table-content-nottitle {
		width: 100%;
		height: calc(100% - 55px);
	}

	.com-table-page {
		height: 55px;
		width: 100%;
		background: #eff3f8;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.zyTable-page {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;
	}

	.zyui-operation {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
