import config from "./config"
import api from './api'
import tool from './utils/tool'
import http from "./utils/request"
import { permission, rolePermission } from './utils/permission'
import zyTable from './components/zyTable'
import zyUpload from './components/zyUpload'
import zyUploadMultiple from './components/zyUpload/multiple'
import zyFormTable from './components/zyFormTable'
import zyTableSelect from './components/zyTableSelect'
import zyPageHeader from './components/zyPageHeader'
import zySelect from './components/zySelect'
import zyDialog from './components/zyDialog'
import zyForm from './components/zyForm'
import zyTitle from './components/zyTitle'
import auth from './directives/auth'
import role from './directives/role'
import time from './directives/time'
import copy from './directives/copy'
import errorHandler from './utils/errorHandler'

export default {
	install(app) {
		//挂载全局对象
		app.config.globalProperties.$CONFIG = config;
		app.config.globalProperties.$TOOL = tool;
		app.config.globalProperties.$HTTP = http;
		app.config.globalProperties.$API = api;
		app.config.globalProperties.$AUTH = permission;
		app.config.globalProperties.$ROLE = rolePermission;

		//注册全局组件
		app.component('zyTable', zyTable);
		app.component('zyUpload', zyUpload);
		app.component('zyUploadMultiple', zyUploadMultiple);
		app.component('zyFormTable', zyFormTable);
		app.component('zyTableSelect', zyTableSelect);
		app.component('zyPageHeader', zyPageHeader);
		app.component('zySelect', zySelect);
		app.component('zyDialog', zyDialog);
		app.component('zyForm', zyForm);
		app.component('zyTitle', zyTitle);

		//注册全局指令
		app.directive('auth', auth)
		app.directive('role', role)
		app.directive('time', time)
		app.directive('copy', copy)

		//全局代码错误捕捉
		app.config.errorHandler = errorHandler
	}
}
