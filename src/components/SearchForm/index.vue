<!--label String 搜索名-->
<!--key String key名-->
<!--value String/Array 输入值-->
<!--list Array 下拉值-->

<!--isText 输入框-->
<!--isSelect 下拉框-->
<!--isDate 日期时间框-->
<!--isRequired 日期是否显示清空-->
<!--isIntervalInput 区间输入 例 1 - 2-->
<!--isClearable 是否清除-->
<!--isMultiple 是否多选-->
<!--isAdvanced 是否显示在展开里面-->
<template>
	<div class="table-page-search-wrapper">
		<el-form :label-position="labelPosition" label-width="110px">
			<!--Search-btn-->
			<div class="search-title-box">
				<div class="search-left">
					<i class="el-icon-search"/>
					<span>条件查询</span>
				</div>
				<div class="table-page-search-submitButtons">
					<el-button
						size="mini"
						type="primary"
						icon="el-icon-search"
						@click="handleSearch"
					>查询
					</el-button>
					<el-button
						size="mini"
						style="margin-left: 8px"
						icon="el-icon-refresh"
						@click="onRefresh"
					>重置
					</el-button>
					<a class="advanced" :style="{color:$store.state.global.theme}" @click="toggleAdvanced">
						{{ advanced ? '收起' : '展开' }}
						<i
							:class="advanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
						/>
					</a>
				</div>
			</div>
			<div class="search-input-box">
				<el-row :gutter="48">
					<template v-for="item in searchArr">
						<!--UP-->
						<!--输入框-->
						<el-col
							v-if="item.isText&&!item.isAdvanced"
							:key="item.key"
							:lg="8"
							:sm="12"
							:md="12"
							:xs="24"
						>
							<el-form-item :label="item.label+':'">
								<div style="display: flex;">
									<el-input
										v-model="item.value"
										:clearable="!item.isClearable"
										:placeholder="item.placeholder||'请输入'"
									/>
								</div>
							</el-form-item>
						</el-col>
						<!--区间输入-->
						<el-col
							v-else-if="item.isIntervalInput&&!item.isAdvanced"
							:key="item.key"
							:lg="8"
							:sm="12"
							:md="12"
							:xs="24"
						>
							<el-form-item :label="item.label+':'">
								<div style="display: flex;">
									<el-input
										v-model="item.value[0]"
										:clearable="!item.isClearable"
										placeholder="请输入"
									/>
									-
									<el-input
										v-model="item.value[1]"
										:clearable="!item.isClearable"
										placeholder="请输入"
									/>
								</div>
							</el-form-item>
						</el-col>
						<!--下拉框-->
						<el-col
							v-else-if="item.isSelect&&!item.isAdvanced"
							:key="item.key"
							:lg="8"
							:sm="12"
							:md="12"
							:xs="24"
						>
							<el-form-item :label="item.label+':'">
								<el-select
									v-model="item.value"
									style="width: 100%;"
									:multiple="item.multiple || false"
									:clearable="!item.isClearable"
									:placeholder="item.placeholder || '请选择'"
								>
									<template>
										<el-option v-for="opt in item.list" :key="opt.value" :label="opt.label"
												   :value="opt.value"/>
									</template>
								</el-select>
							</el-form-item>
						</el-col>
						<!--日期时间框-->
						<el-col
							v-else-if="item.isTimeRange&&!item.isAdvanced"
							:key="item.key"
							:lg="8"
							:sm="12"
							:md="12"
							:xs="24"
						>
							<el-form-item :label="item.label+':'">
								<el-date-picker
									v-model="item.value"
									type="datetimerange"
									value-format="yyyy-MM-dd HH:mm:ss"
									editable
									:default-time="item.defaultRangeTime || null"
									:popper-class="item.isRequired ? 'no-clear' : ''"
									:clearable="!item.isClearable"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
									@change="handleChangeTimes"
								/>
							</el-form-item>
						</el-col>
						<!--日期时间框-->
						<el-col
							v-else-if="item.isTimeDanRange&&!item.isAdvanced"
							:key="item.key"
							:lg="8"
							:sm="12"
							:md="12"
							:xs="24"
						>
							<el-form-item :label="item.label+':'">
								<el-date-picker
									v-model="item.value"
									:popper-class="item.isRequired ? 'no-clear' : ''"
									:type="item.typeName?item.typeName:'datetime'"
									editable
									:default-time="item.defaultRangeTime || null"
									:clearable="!item.isClearable"
									@change="handleChangeTimes"
									placeholder="选择日期时间">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<!--DOWN-->
						<template v-if="advanced&&item.isAdvanced">
							<!--输入框-->
							<el-col v-if="item.isText" :key="item.key" :lg="8" :sm="12" :md="12" :xs="24">
								<el-form-item :label="item.label+':'">
									<div style="display: flex;">
										<el-input
											v-model="item.value"
											:clearable="!item.isClearable"
											:placeholder="item.placeholder||'请输入'"
										/>
									</div>
								</el-form-item>
							</el-col>
							<!--区间输入-->
							<el-col
								v-if="item.isIntervalInput"
								:key="item.key"
								:lg="8"
								:sm="12"
								:md="12"
								:xs="24"
							>
								<el-form-item :label="item.label+':'">
									<div style="display: flex;">
										<el-input
											v-model="item.value[0]"
											:clearable="!item.isClearable"
											placeholder="请输入"
										/>
										-
										<el-input
											v-model="item.value[1]"
											:clearable="!item.isClearable"
											placeholder="请输入"
										/>
									</div>
								</el-form-item>
							</el-col>
							<!--下拉框-->
							<el-col v-else-if="item.isSelect" :key="item.key" :lg="8" :sm="12" :md="12" :xs="24">
								<el-form-item :label="item.label+':'">
									<el-select
										v-model="item.value"
										style="width: 100%;"
										:multiple="item.multiple || false"
										:clearable="!item.isClearable"
										:placeholder="item.placeholder || '请选择'"
									>
										<template>
											<el-option v-for="opt in item.list" :key="opt.value" :label="opt.label"
													   :value="opt.value"/>
										</template>
									</el-select>
								</el-form-item>
							</el-col>
							<!--日期时间框-->
							<el-col
								v-else-if="item.isTimeRange"
								:key="item.key"
								:lg="8"
								:sm="12"
								:md="12"
								:xs="24"
							>
								<el-form-item :label="item.label+':'">
									<el-date-picker
										v-model="item.value"
										type="datetimerange"
										value-format="yyyy-MM-dd HH:mm:ss"
										editable
										:default-time="item.defaultRangeTime || null"
										:popper-class="item.isRequired ? 'no-clear' : ''"
										:clearable="!item.isClearable"
										start-placeholder="开始时间"
										end-placeholder="结束时间"
										@change="handleChangeTimes"
									/>
								</el-form-item>
							</el-col>
							<!--日期时间框-->
							<el-col
								v-else-if="item.isTimeDanRange"
								:key="item.key"
								:lg="8"
								:sm="12"
								:md="12"
								:xs="24"
							>
								<el-form-item :label="item.label+':'">
									<el-date-picker
										v-model="item.value"
										:popper-class="item.isRequired ? 'no-clear' : ''"
										:type="item.typeName?item.typeName:'datetime'"
										editable
										:default-time="item.defaultRangeTime || null"
										:clearable="!item.isClearable"
										@change="handleChangeTimes"
										placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</template>
					</template>
				</el-row>
			</div>
		</el-form>
	</div>
</template>
<script>
export default {
	name: 'SearchForm',
	props: {
		// 查询参数
		searchArr: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			// 搜索 展开/关闭
			advanced: true,
			// 对齐方式
			labelPosition: "right",
			pickerOptions0: {
				disabledDate(time) {
					let curDate = new Date().getTime();
					let three = 90 * 24 * 3600 * 1000;
					let threeMonths = curDate - three;
					return time.getTime() > Date.now() || time.getTime() < threeMonths;
				}
			},
		};
	},
	created() {},
	methods: {
		// 搜索 展开/关闭
		toggleAdvanced() {
			this.advanced = !this.advanced;
		},
		handleSearch() {
			this.$nextTick(() => {
				this.$emit("handleSearch", this.searchArr);
			});
		},
		onRefresh() {
			this.searchArr.map(item => {
				if (item.isClearable) {
					return;
				}
				if (item.value instanceof Array) {
					if (item.isClear) {
						// isClear为false不清除
						return;
					}
					if (item.defaultSelect) {
						item.value = item.defaultSelect;
						return;
					}
					item.value = [];
				} else {
					if (item.defaultSelect) {
						item.value = item.defaultSelect;
						return;
					}
					item.value = null;
				}
			});
			this.$emit("onRefresh", this.searchArr);
		},
		handleChangeTimes() {
			this.$emit("changeTimes", "");
		}
	}
};
</script>
<style lang="scss">
.el-picker-panel {
	&.no-clear {
		.el-picker-panel__footer {
			.el-button--text {
				display: none;
			}
		}
	}
}
</style>
<style lang="scss" scoped>
/*搜索样式*/
.table-page-search-wrapper {
	//border: 1px solid #ebeef5;

	.el-input__inner {
		padding-right: 10px;
	}

	.search-title-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 46px;
		background-color: #ffffff;
		padding: 0 10px;

		.search-left {
			font-size: 15px;
			font-weight: bold;

			span {
				margin-left: 4px;
			}
		}

		.table-page-search-submitButtons {
			white-space: nowrap;

			.advanced {
				font-size: 13px;
				margin-left: 8px;
				cursor:pointer;
			}
		}
	}

	.search-input-box {
		padding: 0 20px;
		background-color: #ffffff;
	}

	.el-form {
		.el-col {
			padding: 0 10px !important;
		}
	}

	.el-form-item {
		height: 30px;
		margin: 0;
		.el-date-editor {
			width: 100%;
		}

		.el-range-separator {
			margin-right: 4px;
		}

		.el-form-item__content {
			width: 210px;
		}
	}
}
</style>
