<template>
<div class="home-page">
    <div class="carousel-page-content">
        <div class="grid-menu">
            <div class="wow animate__zoomIn" data-wow-duration="1s" v-for="(item,index) in cards" :key="index">
                <panel>
                    <cardLeft2Right :info="item" />
                </panel>
            </div>
        </div>
        <div class="wow animate__backInUp" data-wow-duration="1s">
            <panel>
                <div class="readme-md">
                    <markdown :data="markdown" />
                </div>
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
        cardLeft2Right: () => import("@/components/views/home/cardLeft2Right")
    },
    data: function () {
        return {
            markdown: require('../../static/me.md'), //坑：https://blog.csdn.net/wzp20092009/article/details/119614359
            wow: null,
            cards: [{
                cover: require('@/assets/mimic/a1.png'),
                name: "SUPUWOERC",
                content: "Harlek's Incantation of Incineration!",
                class: "back-young"
            }, {
                cover: require('@/assets/mimic/a4.png'),
                name: "FRONT-END",
                content: "日常Codeing的一些技巧和遇到过的问题总结,包含框架搭建,通用方法封装,性能优化",
                class: "back-shy"
            }, {
                cover: require('@/assets/mimic/a25.png'),
                name: "BACK-END",
                content: "学习后端的笔记和遇到过的问题&服务器相关的知识&Java&SSM&Nginx&Redis",
                class: "back-cool"
            }, {
                cover: require('@/assets/mimic/a24.png'),
                name: "ARDUINO",
                content: "用大学的C语言和C++玩耍Arduino的日常,也算半入门物联网（逃）",
                class: "back-warm"
            }]
        };
    },
    created() {
    },
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
