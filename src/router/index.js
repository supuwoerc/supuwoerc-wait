import Vue from 'vue'
import Router from 'vue-router';
Vue.use(Router)
const home = () => { return import ("@/views/home") };
const manager = () => { return import ("@/views/manager") };
const newArticle = () => { return import ("@/views/newArticle") };
const login = () => { return import ("@/views/login") };
const register = () => { return import ("@/views/register") };
const userInfo = () => { return import ("@/views/userInfo") };
const notFound = () => { return import ("@/views/notFound") };

const originalReplace = Router.prototype.replace;
const originalPush = Router.prototype.push;
Router.prototype.replace = function push(location) {
    return originalReplace.call(this, location).catch(err => err);
}
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}
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
            children: []
        }, {
            path: "/newarticle",
            component: newArticle,
            meta: {
                pageName: "新建",
                keepAlive: true
            }
        }, {
            path: "/login",
            component: login,
            meta: {
                pageName: "登录",
                keepAlive: false
            }
        }, {
            path: "/register",
            component: register,
            meta: {
                pageName: "注册",
                keepAlive: false
            }
        }, {
            path: "/userInfo",
            component: userInfo,
            meta: {
                pageName: "个人信息",
                keepAlive: false
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
    /**
     * 添加全局的路由守卫
     */
router.beforeEach((to, from, next) => {
    next();
})
export default router;