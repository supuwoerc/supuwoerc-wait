import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    /**
     * 所有的数据都放在state中
     */
    state: {
        themeColor: localStorage.getItem('themeColor') || "#409EFF", //element主题
        themeMode: localStorage.getItem('themeMode') || "light", //暗黑模式
        navigation: [{
            name: "首页",
            router: "/",
            children: []
        }, {
            name: "前端",
            router: "/frontEnd",
            children: [{
                name: "选项1",
                router: "/8",
                children: []
            }, {
                name: "选项2",
                router: "/6",
                children: []
            }, {
                name: "选项3",
                router: "/999",
                children: []
            }]
        }, {
            name: "后端",
            router: "/backEnd",
            children: [{
                name: "选项4",
                router: "/1",
                children: []
            }, {
                name: "选项5",
                router: "/2",
                children: []
            }, {
                name: "选项6",
                router: "/3",
                children: []
            }]
        }, {
            name: "节点",
            router: "/classify",
            children: []
        }, {
            name: "登录",
            router: "/login",
            children: []
        }],
    },
    /**
     * 操作数据，唯一的通道是mutations
     */
    mutations: {
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
    actions: {},
    getters: {
        getThemeColor: state => {
            return state.themeColor;
        },
        getNavigation: state => {
            return state.navigation;
        },
        getThemeMode: state => {
            return state.themeMode;
        }
    }
})