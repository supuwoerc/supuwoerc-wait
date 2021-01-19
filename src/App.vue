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
        <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" class="upyun-logo" :style="{color:$store.getters.getThemeMode=='light'?'#333':'#fff'}">
            <span>本网站由</span><img src="../static/upyun/upyun.png" alt="" srcset=""><span>提供CND加速/云存储服务</span>
        </a>
    </el-container>
</div>
</template>

<script>
export default {
    name: "App",
    components: {
        commonHeader:()=> import("@/components/common/commonHeader"),
        buttonMenu:()=> import("@/components/common/buttonMenu")
    },
    watch: {
        $route(newValue, oldValue) {
            if (newValue.meta && newValue.meta.pageName) {
                document.title = newValue.meta.pageName;
            }
        },
    },
    mounted() {
        this.initThemeMode();
    },
    methods: {
        //初始化页面模式
        initThemeMode() {
            this.$store.commit("setThemeMode", this.$store.getters.getThemeMode);
        }
    },
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
