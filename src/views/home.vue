<template>
<div class="home-page">
    <div class="grid-menu">
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <div class="menu-item"></div>
            </panel>
        </div>
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <div class="menu-item"></div>
            </panel>
        </div>
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <div class="menu-item"></div>
            </panel>
        </div>
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <div class="menu-item"></div>
            </panel>
        </div>
    </div>
    <div class="wow animate__slideInRight" data-wow-duration="1s">
        <panel>
            <div class="menu-item">1231</div>
        </panel>
    </div>
</div>
</template>

<script>
export default {
    name: "home",
    components: {
        panel: () => import("@/components/views/panel")
    },
    data: function () {
        return {
            markdown: "## 测试markdown组件",
            wow: null
        };
    },
    created() {},
    mounted() {
        this.initWow();
    },
    methods: {
        initWow() {
            this.wow = new this.$wow.WOW({
                scrollContainer: ".home-page",
                live: true,
                mobile: true
            }).init();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/views/home.scss";
</style>
