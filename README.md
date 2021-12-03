## 介绍
基于VUE3和elementPlus实现前端基础框架。
中后台前端解决方案，基于VUE3和elementPlus实现。 使用最新的前端技术栈，提供各类实用的组件方便在业务开发时的调用，并且持续性的提供丰富的业务模板帮助你快速搭建企业级中后台前端任务。
## 演示
- <a href="https://zhangyao1990.github.io/admin-vue3-elementplus/" target="_blank">预览演示</a>

## 特点
- **组件** 基础组件
- **权限** 完整的鉴权体系和高精度权限控制
- **布局** 提供多套布局模式，满足各种视觉需求
- **API** 完善的API管理，使用真实网络MOCK
- **配置** 统一的全局配置和组件配置，支持build后配置热更新
- **性能** 在减少带宽请求和前端算力上多次优化，并且持续着
- **其他** 多功能视图标签、动态权限菜单、控制台组态化、统一异常处理等等
##目录结构
``` sh
┌── public				# 静态资源(不会被Webpack打包)
├── src					# 源代码
│	├── api				# 接口
│	├── assets			# 静态资源(会被打包)
│	├── components		# 组件库
│	├── config			# 配置
│	├── directives		# 自定义指令
│	├── layout			# 框架布局视图
│	├── locales			# 国际化文本
│	├── plugin			# 插件
│	├── router			# 路由表
│	├── store			# VUEX状态管理
│	├── style			# 全局样式
│	├── utils			# 全局公用方法
│	├── views			# 所有视图
│	├── App.vue			# 入口视图
│	└── main.js			# 入口文件
├── .editorconfig		# 统一编辑器样式
├── .env.development    # 开发环境配制
├── .env.production     # 生产环境配制
├── .env.sit            # 预发环境配制
├── .env.test           # 测试环境配制
├── babel.config.js		# postcss 配置
├── package.json		# 包管理
└── vue.config.js		# vue-cli 配置
```
## 安装教程
``` sh
# 克隆项目
git clone git@github.com:zhangyao1990/admin-vue3-elementplus.git

# 安装依赖
npm i

# 启动项目(开发模式)
npm run dev

# 打包项目(测试环境)
npm run test

# 打包项目(预发环境)
npm run sit

# 打包项目(生产环境)
npm run build
```
启动完成后浏览器访问 http://localhost:2800

## 感谢
![fastmock](https://www.fastmock.site/resource/images/logo.png)

https://gitee.com/lolicode/scui/tree/master

## 支持
如果觉得本项目还不错或在工作中有所启发，请在github帮开发者点亮星星，这是对开发者最大的支持和鼓励！
