<template>
<div class="user-center">
    <div class="grid-menu">
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <person-card />
            </panel>
        </div>
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <article-card />
            </panel>
        </div>
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <summary-card />
            </panel>
        </div>
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <message-card />
            </panel>
        </div>
        <div class="wow animate__zoomIn larger" data-wow-duration="1s">
            <panel>
                <calendar-card />
            </panel>
        </div>
        <div class="wow animate__zoomIn larger" data-wow-duration="1s">
            <panel>
               <analyze-card />
            </panel>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "userInfo",
    components: {
        panel: () => import("@/components/views/panel"),
        personCard: () => import("@/components/views/userInfo/personCard"),
        articleCard: () => import("@/components/views/userInfo/articleCard"),
        summaryCard: () => import("@/components/views/userInfo/summaryCard"),
        messageCard: () => import("@/components/views/userInfo/messageCard"),
        calendarCard: () => import("@/components/views/userInfo/calendarCard"),
        analyzeCard: () => import("@/components/views/userInfo/analyzeCard"),
    },
    data: function () {
        return {

        };
    },
    created() {},
    mounted() {
        this.initWow();
    },
    methods: {
        initWow() {
            this.wow = new this.$wow.WOW({
                scrollContainer: ".user-center",
                live: true,
                mobile: true,
            }).init();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/views/userInfo.scss";
</style>
