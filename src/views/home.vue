<template>
<div class="home-page">
    <div class="carousel-page-content">
        <div class="grid-menu">
            <div class="wow animate__zoomIn" data-wow-duration="1s">
                <panel>
                    <div class="menu-item">
                        <div class="image-box animate__animated animate__zoomIn">
                            <img src="../assets/mimic/a1.png" alt="" srcset="">
                        </div>
                        <div class="desc-box">
                            <div class="menu-title font-young animate__animated animate__slideInRight">SUPUWOERC</div>
                            <div class="menu-desc font-young animate__animated animate__slideInRight">关于散夜（站点）</div>
                        </div>
                    </div>
                </panel>
            </div>
            <div class="wow animate__zoomIn" data-wow-duration="1s">
                <panel>
                    <div class="menu-item">
                        <div class="image-box animate__animated animate__zoomIn">
                            <img src="../assets/mimic/a4.png" alt="" srcset="">
                        </div>
                        <div class="desc-box">
                            <div class="menu-title font-young animate__animated animate__slideInRight">FRONT-END</div>
                            <div class="menu-desc font-young animate__animated animate__slideInRight">点击查看前端相关</div>
                        </div>
                    </div>
                </panel>
            </div>
            <div class="wow animate__zoomIn" data-wow-duration="1s">
                <panel>
                    <div class="menu-item">
                        <div class="image-box animate__animated animate__zoomIn">
                            <img src="../assets/mimic/a22.png" alt="" srcset="">
                        </div>
                        <div class="desc-box">
                            <div class="menu-title font-young animate__animated animate__slideInRight">BACK-END</div>
                            <div class="menu-desc font-young animate__animated animate__slideInRight">点击查看后端相关</div>
                        </div>
                    </div>
                </panel>
            </div>
            <div class="wow animate__zoomIn" data-wow-duration="1s">
                <panel>
                    <div class="menu-item">
                        <div class="image-box animate__animated animate__zoomIn">
                            <img src="../assets/mimic/a24.png" alt="" srcset="">
                        </div>
                        <div class="desc-box">
                            <div class="menu-title font-young animate__animated animate__slideInRight">ARDUINO</div>
                            <div class="menu-desc font-young animate__animated animate__slideInRight">点击查看硬件相关</div>
                        </div>
                    </div>
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
