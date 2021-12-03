<template>
	<el-main>
		<el-card shadow="never">
			<el-tabs tab-position="top">

				<el-tab-pane label="系统设置">
					<el-form ref="form" :model="sys" label-width="100px" style="margin-top: 20px;">
						<el-form-item label="系统名称">
							<el-input v-model="sys.name"></el-input>
						</el-form-item>
						<el-form-item label="LogoUrl">
							<el-input v-model="sys.logoUrl"></el-input>
						</el-form-item>
						<el-form-item label="登录开关">
							<el-switch v-model="sys.login"></el-switch>
							<div class="el-form-item-msg">关闭后普通用户无法登录，仅允许管理员角色登录</div>
						</el-form-item>
						<el-form-item label="密码验证规则">
							<el-input v-model="sys.passwordRules"></el-input>
						</el-form-item>
						<el-form-item label="版权信息">
							<el-input type="textarea" :autosize="{minRows: 4}" v-model="sys.copyright"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="短信配置">
					<el-form ref="form" :model="msg" label-width="100px" style="margin-top: 20px;">
						<el-form-item label="短信开关">
							<el-switch v-model="msg.open"></el-switch>
							<div class="el-form-item-msg" data-v-b33b3cf8="">关闭后用户无法收到短信，但日志中将记录</div>
						</el-form-item>
						<el-form-item label="appKey">
							<el-input v-model="msg.appKey"></el-input>
						</el-form-item>
						<el-form-item label="secretKey">
							<el-input v-model="msg.secretKey"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary">保存</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'system',
		data() {
			return {
				sys: {
					name: "ZYUI",
					logoUrl: "",
					login: true,
					passwordRules: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$",
					copyright: "@ZYUI"
				},
				msg: {
					open: true,
					appKey: "",
					secretKey: ""
				}
			}
		},
		methods: {}
	}
</script>

<style>
</style>
