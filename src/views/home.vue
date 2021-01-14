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
        <markdown :data="markdown" />
    </div>
</div>
</template>

<script>
import {
    markdown
} from "@/api/api";
export default {
    name: "home",
    components: {
        panel:()=>import("@/components/views/panel")
    },
    data: function () {
        return {
            markdown: "",
            wow: null
        };
    },
    created() {},
    mounted() {
        this.initWow();
        this.getMarkdownData();
    },
    methods: {
        initWow() {
            this.wow = new this.$wow.WOW({
                scrollContainer: ".home-page",
                live: true,
                mobile: true
            }).init();
        },
        getMarkdownData() {
            markdown({}).then((res) => {
                this.markdown = res;
            })
        },
    },
};
</script>

<style lang="scss">
@import "@/style/views/home.scss";
</style>
