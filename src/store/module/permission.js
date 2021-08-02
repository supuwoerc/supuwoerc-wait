import { getRoles, getMenus, getDefaultMenus } from "../../api/api";
import { asyncRouter } from "../../router/index";
import router from '../../router/index';
/**
 * 根据角色匹配性对应的动态路由
 * @param {} routes 
 * @param {*} range 
 * @returns 
 */
function match(routes, range) {
    let result = [];
    routes.forEach((item, index) => {
        let routeRoles = item.meta && item.meta.role ? item.meta.role : [];
        if (routeRoles.some(cell => range.includes(cell))) {
            item.children = match(item.children || [], range);
            result.push(item);
        }
    })
    return result;
}
export default {
    state: {
        loginStatus: false, //登录状态
        roles: [], //角色集合
        navigation: [], //菜单
        hasGetPermissionRoutes: false //获取过权限路由
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
        },
        setHasGetPermissionRoutes(state, payload) {
            state.hasGetPermissionRoutes = payload;
        },
        resetAllStatus(state, payload) {
            state.loginStatus = false;
            state.roles = [];
            state.navigation = [];
        }
    },
    actions: {
        //查询角色后依据角色生成路由
        async getRoleRouter(context, payload) {
            let res = await getRoles();
            if (res && res.data) {
                context.commit("setRoles", res.data);
                let roleNames = res.data.map(item => item.role_name.toLowerCase());
                let matchResult = match(asyncRouter, roleNames);
                context.commit("setHasGetPermissionRoutes", true);
                router.addRoutes(matchResult);
                console.log("完成添加动态路由")
                return Promise.resolve("完成")
            }
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
        getHasGetPermissionRoutes: state => {
            return state.hasGetPermissionRoutes;
        }
    }
}