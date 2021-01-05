// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import element from '@/element/index';
Vue.use(element); //按需加载element
import wow from 'wowjs';
import 'animate.css';
import store from '@/store/store'; //注入vuex
Vue.prototype.$wow = wow; //全局注入wow
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})