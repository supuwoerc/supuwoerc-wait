import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const home = () => { return import ("@/views/home") };
const manager = () => { return import ("@/views/manager") };
const notFound = () => { return import ("@/views/notFound") };
export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: home,
        meta: {
            pageName: "首页",
            keepAlive: false
        }
    }, {
        path: '/manager',
        name: 'manager',
        component: manager,
        meta: {
            pageName: "管理",
            keepAlive: true
        }
    }, {
        path: "*",
        component: notFound,
        meta: {
            pageName: "404",
            keepAlive: false
        }
    }]
})