<template>
<div class="home-page">
    <div class="carousel-page-content">
        <div class="grid-menu">
            <div class="wow animate__zoomIn" data-wow-duration="1s">
                <panel>
                    <div class="menu-item">
                        <img src="../assets/mimic/back31.png" alt="" srcset="">
                        <div class="menu-title font-young">SUPUWOERC 散夜</div>
                        <div class="menu-desc font-young">关于</div>
                    </div>
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
        <div class="wow animate__flipInX" data-wow-duration="1s">
            <panel>
                <div class="menu-item">1231</div>
            </panel>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "home",
    components: {
        panel: () => import("@/components/views/panel"),
    },
    data: function () {
        return {
            markdown: "## 测试markdown组件",
            wow: null,
            carousels: [{
                desc: "",
                img: require("../assets/cover/a1.png")
            }, {
                desc: "",
                img: require("../assets/cover/a2.jpg")
            }, {
                desc: "",
                img: require("../assets/cover/a3.jpg")
            }]
        };
    },
    created() {},
    mounted() {
        this.initWow();
    },
    beforeDestroy() {},
    methods: {
        initWow() {
            this.wow = new this.$wow.WOW({
                scrollContainer: ".carousel-page-content",
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
