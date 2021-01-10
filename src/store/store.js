import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    /**
     * 所有的数据都放在state中
     */
    state: {
        themeColor: localStorage.getItem('themeColor') || "#409EFF"
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
        }
    }
})