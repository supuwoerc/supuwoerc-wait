import Vue from 'vue'
import Router from 'vue-router';
import store from "../store/store";
import { Message } from "element-ui";
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
    },
    children: []
}, {
    path: '/newArticle',
    name: 'newArticle',
    component: newArticle,
    meta: {
        pageName: "编辑",
        keepAlive: false,
        role: ['admin']
    },
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
    children: []
}];
//https://github.com/vuejs/vue-router/issues/1234
const createRouter = () =>
    new Router({
        mode: "hash",
        routes: defaultRouter
    });
const router = createRouter();
// 定义一个resetRouter 方法，在退出登录时，调用即可
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}
/**
 * 添加全局的路由守卫
 */
router.beforeEach(async(to, from, next) => {
    if (to.path == '/login' && store.state.loginStatus) {
        Message.error("请先注销此次登录");
        next('/');
        return;
    }
    //动态添加权限路由
    if (store.state.loginStatus && !store.getters.getHasGetPermissionRoutes) {
        await store.dispatch("getRoleRouter");
        next({...to, replace: true });
    } else {
        next();
    }

})
export default router;