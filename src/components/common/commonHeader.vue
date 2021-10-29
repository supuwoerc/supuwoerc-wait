<template>
<div class="common-header-container">
    <div class="left">
        <div @click="goIndex()">
            <i class="iconfont icon-boke1 logo" style="color: #ffffff"></i>
            <span class="logo">散夜</span>
        </div>
    </div>
    <div class="right">
        <div class="navbar">
            <loop-menu></loop-menu>
        </div>
        <div class="setting">
            <i class="el-icon-setting" @click="setting()"></i>
        </div>
    </div>
    <!-- 设置dialog -->
    <el-dialog title="设置" :visible.sync="dialogFormVisible" :width="dialogWidth" :custom-class="'theme-dialog'">
        <el-form>
            <el-form-item label="暗黑模式(.beta)" :label-width="formLabelWidth">
                <el-switch :value="$store.getters.getThemeMode=='dark'" @change="changeMode" active-color="#000000" :inactive-color="this.$store.getters.getThemeColor">
                </el-switch>
            </el-form-item>
            <el-form-item label="主题颜色" :label-width="formLabelWidth">
                <theme-color-selector :color="this.$store.getters.getThemeColor" @color-update="colorChange" />
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
import themeColorSelector from "./themeColorSelector";
export default {
    name: "commonHeader",
    components: {
        themeColorSelector,
        loopMenu: () => import('@/components/common/loopMenu')
    },
    data: function () {
        return {
            dialogVisible: false,
            dialogFormVisible: false,
            formLabelWidth: "120px",
            form: {},
            visible: true,
            dialogWidth: "80%", //移动端的宽度   打开会判断分辨率修改
        };
    },
    computed: {
        navActiveIndex: function () {
            return this.$route.path; //nav默认激活
        },
    },
    watch: {
        form: {
            handler: function (newVal) {
                this.$store.commit("setThemeMode", newVal.mode ? 'dark' : 'light');
            },
            deep: true,
        },
    },
    methods: {
        /**
         * 主题色变化事件
         */
        colorChange(color) {
            this.color = color;
            this.$notify({
                title: "成功",
                message: `当前主题色为${color}`,
                type: "success",
                offset: 60,
            });
        },
        goIndex() {
            this.$router.replace({
                path: "/",
            });
        },
        setting() {
            let cliwidth = document.body.clientWidth;
            if (cliwidth > 1200) {
                this.dialogWidth = "360px";
            }
            this.dialogFormVisible = true;
        },
        changeMode(val) {
            this.$store.commit("setThemeMode", val ? 'dark' : 'light');
        },
    },
};
</script>

<style lang="scss">
@import "@/style/components/common/commonHeader.scss";
</style>