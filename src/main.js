// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import wow from 'wowjs'
import 'animate.css'
import '@/style/common/reset.css';
import '@/style/common/border.css';
import 'animate.css'
Vue.config.productionTip = false;
Vue.prototype.$wow = wow; //全局注入wow
import 'element-ui/lib/theme-chalk/index.css';
import element from '@/element/index'; //按需加载element
Vue.use(element)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});