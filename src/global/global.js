/**
 * 导出全局都会用的组件，省去每次使用都要引入
 */
import MARKWODW from '../components/views/markdown.vue';
export default (vue) => {
    vue.component('markdown', MARKWODW)
}