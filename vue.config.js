const ip = require('ip') // ip.address()
const needHost = ip.address()
module.exports = {
	//设置为空打包后不分更目录还是多级目录
	//说明：部署到github上配置，实际项目可设为空
	publicPath: process.env.NODE_ENV === "production" ? "/admin-vue3-elementplus" : "",
	//build编译后存放静态文件的目录
	assetsDir: "static",
	// build编译后不生成资源MAP文件
	productionSourceMap: false,
	//开发服务,build后的生产模式还需nginx代理
	devServer: {
		open: false, //运行后自动打开游览器
		host: needHost,
		port: 2800, //挂载端口
		proxy: {
			'/api': {
				target: 'http://0.0.0.0:7300/mock/61911588f503af1339b9ca63/api',
				ws: true,
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	},
	configureWebpack: config => {
		//性能提示
		config.performance = {
			hints: false
		}
		config.optimization = {
			splitChunks: {
				chunks: "async",
				automaticNameDelimiter: '~',
				name: true,
				cacheGroups: {
					//第三方库抽离
					vendor: {
						name: "modules",
						test: /[\\/]node_modules[\\/]/,
						priority: -10
					},
					tinymce: {
						name: "tinymce",
						test: /[\\/]node_modules[\\/]tinymce[\\/]/
					},
					echarts: {
						name: "echarts",
						test: /[\\/]node_modules[\\/]echarts[\\/]/
					}
				}
			}
		}
	},
	chainWebpack: config => {
		// 移除 prefetch 插件
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');
		config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
	}
}
