/*全局自定义指令*/
import highlight from "highlight.js"
export default (vue) => {
    /**
     * 自定义全局高亮代码指令
     * https://blog.csdn.net/qq_39826207/article/details/109265099
     */
    vue.directive('highlight', (el) => {
        let blocks = el.querySelectorAll('pre code')
        blocks.forEach((block) => {
            highlight.highlightBlock(block)
        })
    })
}