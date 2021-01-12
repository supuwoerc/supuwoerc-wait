<template>
<div id="app" v-cloak>
    <el-container>
        <el-header>
            <common-header />
        </el-header>
        <el-main>
            <keep-alive key="keep-alive">
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            <button-menu />
        </el-main>
    </el-container>
</div>
</template>

<script>
import commonHeader from "@/components/common/commonHeader";
import buttonMenu from "@/components/common/buttonMenu";
export default {
    name: "App",
    components: {
        commonHeader,
        buttonMenu
    },
    watch: {
        $route(newValue, oldValue) {
            if (newValue.meta && newValue.meta.pageName) {
                document.title = newValue.meta.pageName;
            }
        },
    },
    mounted() {
        new this.$wow.WOW().init();
    },
    methods: {},
};
</script>

<style lang="scss">
[v-cloak] {
    display: none !important;
}
@import "@/style/common/reset.scss";
@import "@/style/common/border.scss";
@import "@/style/common/app.scss";
</style>
