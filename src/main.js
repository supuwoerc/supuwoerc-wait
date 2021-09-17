// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '@/assets/font/iconfont.css'; //阿里字体图标  
import '@/style/element/element-variables.scss'; //自定义主题色element配置
import '@/style/common/wickedcss.min.css'; //动画
import element from '@/element/index';
Vue.use(element); //按需加载element非全局组件
import wow from 'wowjs';
import 'animate.css';
import store from '@/store/store'; //注入vuex
Vue.prototype.$wow = wow; //全局注入wow
//markdown代码高亮
import highlight from 'highlight';
Vue.use(highlight);
//注册自定义指令
import directives from "@/directive/directives";
import { getServerSource } from "./utils/index";
directives(Vue);
//注册全局组件
import global from "@/global/global";
global(Vue);
//瀑布流
import VirtualCollection from 'vue-virtual-collection';
Vue.use(VirtualCollection);
/**
 * 注入element相关全局组件
 */
import {
    Loading,
    MessageBox,
    Notification,
    Message
} from 'element-ui';
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$getServerSource = getServerSource;
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})