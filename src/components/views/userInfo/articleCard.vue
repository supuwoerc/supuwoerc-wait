<template>
<div class="menu-item">
    <div class="title">
        <span>我的文字</span>
        <div>
            <router-link to="newArticle">
                <i class="iconfont icon-plus-circle" title="新增"></i>
            </router-link>
            <i class="iconfont icon-unorderedlist" title="更多"></i>
        </div>
    </div>
    <div class="info article-card"></div>
</div>
</template>

<script>
export default {
    name: 'articleCard',
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {

    },

    destroyed() {},
}
</script>

<style lang="scss" scoped>
@import "@/style/components/views/userInfo/articleCard.scss";
</style>
