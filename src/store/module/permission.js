import { getRoles, getMenus, getDefaultMenus } from "../../api/api";
import Router from 'vue-router';
export default {
    state: {
        loginStatus: false, //登录状态
        roles: [], //角色集合
        navigation: [], //菜单
    },
    mutations: {
        setLoginStatus(state, payload) {
            state.loginStatus = payload;
        },
        setRoles(state, payload) {
            state.roles = payload;
        },
        setNavigation(state, payload) {
            state.navigation = payload;
        }
    },
    actions: {
        //查询角色后依据角色生成路由
        async getRoleRouter(context, payload) {
            let roles = await getRoles();
        },
        //查询默认展示的菜单
        async getDefaultMenus(context, payload) {
            let res = await getDefaultMenus();
            if (res.code == 200) {
                context.commit("setNavigation", res.data);
            } else {
                context.commit("setNavigation", []);
            }
        },
        //查询当前登录用户的菜单
        async getCurrentUserMenu(context, payload) {
            let res = await getMenus();
            if (res.code == 200) {
                context.commit("setNavigation", res.data);
            } else {
                context.commit("setNavigation", []);
            }
        }
    },
    getters: {

    }
}