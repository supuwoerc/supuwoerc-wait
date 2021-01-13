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
import panel from "@/components/views/panel";
import {
    markdown
} from "@/api/api";
export default {
    name: "home",
    components: {
        panel,
    },
    data: function () {
        return {
            markdown: ""
        };
    },
    created() {},
    mounted() {
        this.initWow();
        this.getMarkdownData();
    },
    methods: {
        initWow() {
            new this.$wow.WOW({
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
