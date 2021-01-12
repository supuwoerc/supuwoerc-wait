<template>
<div class="markdown-file-show-container-parent">
    <!-- vue展示markdown内容 -->
    <div v-highlight v-html="markedData" class="markdown-file-show-container"></div>
</div>
</template>

<script>
// 将markdown转换成html
import marked from 'marked';
/**
 * atelier-cave-light.css
 * pojoaque.css
 * kimbie.light.css
 * atelier-forest-dark.css
 * arduino-light.css
 */
import "highlight.js/styles/darcula.css";

export default {
    name: "markdown",
    props: {
        data: {
            type: String,
            default: ''
        }
    },
    computed: {
        markedData: function () {
            return marked(this.data)
        }
    },
    data() {
        return {

        };
    },
    mounted() {
    }
}
</script>

<style lang="scss">
@import "@/style/components/views/markdown.scss";
</style>
