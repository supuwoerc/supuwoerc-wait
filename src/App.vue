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
export default {
    name: "App",
    data: function () {
        return {}
    },
    computed: {
        loginStatus() {
            return this.$store.state.loginStatus;
        },
    },
    components: {
        commonHeader: () => import("@/components/common/commonHeader"),
        buttonMenu: () => import("@/components/common/buttonMenu")
    },
    watch: {
        $route(newValue, oldValue) {
            if (newValue.meta && newValue.meta.pageName) {
                document.title = newValue.meta.pageName;
            }
        },
        loginStatus: {
            handler: function (newVal) {
                if (newVal) {
                    this.$store.dispatch("getCurrentUserMenu");
                } else {
                    this.$store.dispatch("getDefaultMenus");
                }
            },
            immediate: true
        }
    },
    created() {

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
