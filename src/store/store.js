import Vue from 'vue'
import Vuex from 'vuex'
import permission from "./module/permission";
import createVuexAlong from 'vuex-along' //vuex-along做持久化
Vue.use(Vuex);
export default new Vuex.Store({
    /**
     * 所有的数据都放在state中
     */
    state: {
        ...permission.state,
        themeColor: localStorage.getItem('themeColor') || "#409EFF", //element主题
        themeMode: localStorage.getItem('themeMode') || "light", //暗黑模式
    },
    /**
     * 操作数据，唯一的通道是mutations
     */
    mutations: {
        ...permission.mutations,
        setThemeColor(state, payload) {
            localStorage.setItem("themeColor", payload);
            state.themeColor = payload;
        },
        setThemeMode(state, payload) {
            state.themeMode = payload;
            localStorage.setItem("themeMode", payload);
            if (payload == "light") {
                document.querySelector('body').classList.remove("dark");
                document.querySelector('body').classList.add("light"); //背景图
                window.document.documentElement.setAttribute("data-theme", "light"); //主题色
            } else {
                document.querySelector('body').classList.remove("light");
                document.querySelector('body').classList.add("dark");
                window.document.documentElement.setAttribute("data-theme", "dark");
            }
        }
    },
    /**
     * actions,可以来做异步操作，然后提交给mutations，而后再对state(数据)进行操作
     */
    actions: {
        ...permission.actions
    },
    getters: {
        ...permission.getters,
        getThemeColor: state => {
            return state.themeColor;
        },
        getNavigation: state => {
            return state.navigation;
        },
        getThemeMode: state => {
            return state.themeMode;
        }
    },
    plugins: [createVuexAlong({
        name: "sanye-vuex-along",
        local: {
            list: ["hasGetPermissionRoutes"], //动态路由不持久化(刷新时需要重新获取动态路由)
            isFilter: true
        }
    })]
})