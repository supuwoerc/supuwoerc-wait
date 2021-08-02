import Vue from 'vue'
import Router from 'vue-router';
Vue.use(Router)
const home = () => { return import ("@/views/home") };
const manage = () => { return import ("@/views/manage") };
const newArticle = () => { return import ("@/views/newArticle") };
const login = () => { return import ("@/views/login") };
const register = () => { return import ("@/views/register") };
const userInfo = () => { return import ("@/views/userInfo") };
const notFound = () => { return import ("@/views/notFound") };

const originalReplace = Router.prototype.replace;
const originalPush = Router.prototype.push;
Router.prototype.replace = function push(location) {
    return originalReplace.call(this, location).catch(err => err);
};
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
//默认路由
export const defaultRouter = [{
    path: '/',
    name: 'home',
    component: home,
    meta: {
        pageName: "首页",
        keepAlive: false
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
}];
//权限路由
export const asyncRouter = [{
    path: '/manage',
    name: 'manage',
    component: manage,
    meta: {
        pageName: "管理",
        keepAlive: false,
        role: ['admin']
    },
    children: [{
        path: '/newArticle',
        name: 'newArticle',
        component: newArticle,
        meta: {
            pageName: "编辑",
            keepAlive: false,
            role: ['admin']
        },
    }]
}];
const router = new Router({
    mode: 'hash',
    routes: defaultRouter
});
/**
 * 添加全局的路由守卫
 */
router.beforeEach((to, from, next) => {
    next();
})
export default router;