<template>
<div class="not-found_page">
    <div class="center" @click="goHomePage()">
        <section class="logo wow animate__headShake" data-wow-duration="1s">
            <i class="iconfont icon-icon-test1" :style="{color:$store.getters.getThemeColor}" />
        </section>
        <section class="tips wow animate__headShake" data-wow-duration="1s" :style="{color:$store.getters.getThemeColor}">
            <span>UH OH! 页面丢失</span><br />
            <span>您所寻找的页面不存在</span>
        </section>
    </div>
</div>
</template>

<script>
export default {
    name: "notFound",
    data: function () {
        return {

        }
    },
    created() {},
    mounted() {
        this.initWow();
    },
    methods: {
        initWow() {
            new this.$wow.WOW().init();
        },
        goHomePage() {
            this.$router.push({
                path: `/`
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/style/views/notFound.scss";
</style>
