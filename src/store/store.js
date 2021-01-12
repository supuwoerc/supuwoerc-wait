import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    /**
     * 所有的数据都放在state中
     */
    state: {
        themeColor: localStorage.getItem('themeColor') || "#409EFF",
        navigation: [{
            name: "首页",
            router: "/",
            children: []
        }, {
            name: "前端",
            router: "/frontEnd",
            children: [{
                name: "选项1",
                router: "",
                children: []
            }, {
                name: "选项2",
                router: "",
                children: []
            }, {
                name: "选项3",
                router: "",
                children: []
            }]
        }, {
            name: "后端",
            router: "/backEnd",
            children: [{
                name: "选项4",
                router: "",
                children: []
            }, {
                name: "选项5",
                router: "",
                children: []
            }, {
                name: "选项6",
                router: "",
                children: []
            }]
        }, {
            name: "节点",
            router: "/manager",
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
        }
    }
})