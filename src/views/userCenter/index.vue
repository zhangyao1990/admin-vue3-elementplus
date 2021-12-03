<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<div class="user-info">
						<div class="user-info-top">
							<el-avatar :size="80" src="img/avatar.gif"></el-avatar>
							<h2>{{ form.name||'-' }}</h2>
							<p>{{ form.about||'无签名' }}</p>
							<el-button type="primary" round icon="el-icon-collection-tag" size="medium">Administrator
							</el-button>
						</div>
						<div class="user-info-main">
							<ul>
								<li><label><i class="el-icon-user"></i></label><span>97972619@qq.com</span></li>
								<li><label><i class="el-icon-present"></i></label><span>1990-06-19</span></li>
								<li><label><i class="el-icon-male"></i></label><span>男</span></li>
								<li><label><i class="el-icon-location-outline"></i></label><span>中国/浙江/杭州</span></li>
								<li><label><i class="el-icon-office-building"></i></label><span>产品研发/摸鱼组</span></li>
								<li><label><i class="el-icon-coin"></i></label><span>超级管理员</span></li>
							</ul>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :lg="16">
				<el-card shadow="never">
					<el-tabs tab-position="top">
						<el-tab-pane label="个人信息">
							<el-form ref="form" :model="form" label-width="80px" style="width: 460px;margin-top:20px;">
								<el-form-item label="账号">
									<el-input v-model="form.user" disabled></el-input>
									<div class="el-form-item-msg">账号信息用于登录，系统不允许修改</div>
								</el-form-item>
								<el-form-item label="姓名">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
								<el-form-item label="性别">
									<el-select v-model="form.sex" placeholder="请选择">
										<el-option label="保密" value="0"></el-option>
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="2"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="个性签名">
									<el-input v-model="form.about" type="textarea"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="savePersonal">保存</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name: 'userCenter',
		data() {
			return {
				form: {
					user: "97972619@qq.com",
					name: "ZhangYao",
					sex: "1",
					about: "正所谓富贵险中求"
				},
			}
		},
		//路由跳转进来 判断from是否有特殊标识做特殊处理
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				if (from.is) {
					//删除特殊标识，防止标签刷新重复执行
					delete from.is
					//执行特殊方法
					vm.$alert('路由跳转过来后含有特殊标识，做特殊处理', '提示', {
						type: 'success',
						center: true
					}).then(() => {
					}).catch(() => {
					})
				}
			})
		},
		methods: {
			savePersonal() {
				this.$alert(`success函数钩子，return false后阻止后续执行，回调参数打开控制台查看`, {
					title: "提示",
					type: "success"
				})
			}
		}
	}
</script>

<style scoped>
	.el-card {
		margin-bottom: 15px;
	}
</style>
