<template>
<div class="common-header-container">
    <div class="left">
        <div>
            <img src="../../assets/images/app.png">
        </div>
    </div>
    <div class="right">
        <theme-color-selector :color="this.$store.getters.getThemeColor" @color-update="colorChange" />
    </div>
</div>
</template>

<script>
import themeColorSelector from "./themeColorSelector";
export default {
    name: "commonHeader",
    components: {
        themeColorSelector,
    },
    data: function () {
        return {};
    },
    methods: {
        colorChange(color) {
            this.color = color;
            this.$notify({
                title: "成功",
                message: `以为您设置主题色为${color}`,
                type: "success",
            });
        },
    },
};
</script>

<style lang="scss">
@import "@/style/components/common/commonHeader.scss";
</style>
