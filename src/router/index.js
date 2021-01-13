import Vue from 'vue'
import Router from 'vue-router';
import moment from 'moment';
Vue.use(Router)
const home = () => { return import ("@/views/home") };
const manager = () => { return import ("@/views/manager") };
const newArticle = () => { return import ("@/views/newArticle") };
const notFound = () => { return import ("@/views/notFound") };
const router = new Router({
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
            },
            children: [{
                path: "/newarticle",
                component: newArticle,
                meta: {
                    pageName: "新建",
                    keepAlive: true
                }
            }]
        }, {
            path: "*",
            component: notFound,
            meta: {
                pageName: "404",
                keepAlive: false
            }
        }]
    })
    /**
     * 添加全局的路由守卫
     */
router.beforeEach((to, from, next) => {
    console.log(to)
    next();
})
export default router;