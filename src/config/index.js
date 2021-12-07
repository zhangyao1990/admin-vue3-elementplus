/**
 * 各环境接口请求地址
 * Created by zhangyao 2021/11/30
 */
let node_env = process.env.NODE_ENV
let vue_app_flag = process.env.VUE_APP_FLAG
let API_URL = ''
if (node_env === 'development') {
	// 本地
	API_URL = 'https://www.fastmock.site/mock/ffbd1a652f84b5aee2f4ef14440a10df/admin/api'
} else if (process.env.NODE_ENV === 'production') {
	if (vue_app_flag === 'pro') {
		// production 生产环境
		API_URL = 'https://www.fastmock.site/mock/ffbd1a652f84b5aee2f4ef14440a10df/admin/api'
	} else if (vue_app_flag === 'sit') {
		// sit 预发布
		API_URL = 'https://www.fastmock.site/mock/ffbd1a652f84b5aee2f4ef14440a10df/admin/api'
	} else if (vue_app_flag === 'test') {
		// test 测试环境
		API_URL = 'https://www.fastmock.site/mock/ffbd1a652f84b5aee2f4ef14440a10df/admin/api'
	}
}

// 公共变量
const DEFAULT_CONFIG = {
	//标题
	APP_NAME: "vue admin plus",

	//首页地址
	DASHBOARD_URL: "/dashboard",

	//版本号
	APP_VER: "1.0.0",

	//内核版本号
	CORE_VER: "1.0.0",
	API_URL: API_URL,
	//请求超时
	TIMEOUT: 10000,

	//TokenName
	TOKEN_NAME: "Authorization",

	//Token前缀，注意最后有个空格，如不需要需设置空字符串
	TOKEN_PREFIX: "Bearer ",

	//追加其他头
	HEADERS: {},

	//请求是否开启缓存
	REQUEST_CACHE: false,

	//布局 默认：default | 通栏：header | 经典：menu
	LAYOUT: 'default',

	//菜单是否折叠
	MENU_IS_COLLAPSE: false,

	//菜单是否启用手风琴效果
	MENU_UNIQUE_OPENED: false,

	//是否开启多标签
	LAYOUT_TAGS: true,

	//语言
	LANG: 'zh-cn',

	//主题颜色
	COLOR: '#F5222D'
}
module.exports = DEFAULT_CONFIG
