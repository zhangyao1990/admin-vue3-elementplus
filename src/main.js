import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import zyui from './zyui'
import i18n from './locales'
import router from './router'
import store from './store'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus, {size: 'mini'});
app.use(i18n);
app.use(zyui);

//挂载app
app.mount('#app');
