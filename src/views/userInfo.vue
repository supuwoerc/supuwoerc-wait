<template>
<div class="user-center">
    <div class="grid-menu">
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <div class="menu-item">
                    <div class="title">
                        <span>个人信息</span>
                        <div>
                            <i class="iconfont icon-setting" title="编辑"></i>
                            <i class="iconfont icon-logout" @click="logOut()" title="注销"></i>
                        </div>
                    </div>
                    <div class="info person-card">
                        <div class="left">
                            <el-image style="width: 70%;" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" fit="fill"></el-image>
                            <el-button size="small">上传</el-button>
                        </div>
                        <div class="right">
                            <el-form :disabled="!editPersonInfo" label-position="left" size="small" label-width="55px">
                                <el-form-item>
                                    <div slot="label" class="form-label">
                                        账号:
                                    </div>
                                    <el-input v-model="personInfo.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div slot="label" class="form-label">
                                        昵称:
                                    </div>
                                    <el-input v-model="personInfo.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div slot="label" class="form-label">
                                        性别:
                                    </div>
                                    <el-input v-model="personInfo.name"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </panel>
        </div>
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <div class="menu-item">
                    <div class="title">
                        <span>我的文字</span>
                        <div>
                            <i class="iconfont icon-unorderedlist" title="更多"></i>
                        </div>
                    </div>
                    <div class="info">

                    </div>
                </div>
            </panel>
        </div>
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <div class="menu-item">
                    <div class="title">
                        <span>文章归档</span>
                        <div>
                            <i class="iconfont icon-reloadtime" title="更多"></i>
                        </div>
                    </div>
                    <div class="info">

                    </div>
                </div>
            </panel>
        </div>
        <div class="wow animate__zoomIn" data-wow-duration="1s">
            <panel>
                <div class="menu-item">
                    <div class="title">
                        <span>消息回复</span>
                        <div>
                            <i class="iconfont icon-message" title="更多"></i>
                        </div>
                    </div>
                    <div class="info">

                    </div>
                </div>
            </panel>
        </div>
        <div class="wow animate__zoomIn larger" data-wow-duration="1s">
            <panel>
                <div class="menu-item">
                    <div class="title">
                        <span>发布日历</span>
                        <div>
                            <i class="iconfont icon-piechart" title="更多"></i>
                        </div>
                    </div>
                    <div class="info">

                    </div>
                </div>
            </panel>
        </div>
        <div class="wow animate__zoomIn larger" data-wow-duration="1s">
            <panel>
                <div class="menu-item">
                    <div class="title">
                        <span>数据分析</span>
                        <div>
                            <i class="iconfont icon-piechart" title="更多"></i>
                        </div>
                    </div>
                    <div class="info">

                    </div>
                </div>
            </panel>
        </div>
    </div>
</div>
</template>

<script>
import {
    getCurrentUserInfo,
    logOut
} from "../api/api";
export default {
    name: "userInfo",
    components: {
        panel: () => import("@/components/views/panel")
    },
    data: function () {
        return {
            personInfo: {},
            editPersonInfo:false, 
        }
    },
    created() {
        this.getUserinfo();
    },
    mounted() {
        this.initWow();
    },
    methods: {
        initWow() {
            this.wow = new this.$wow.WOW({
                scrollContainer: ".user-center",
                live: true,
                mobile: true
            }).init();
        },
        //个人信息
        async getUserinfo() {
            let res = await getCurrentUserInfo();
            console.log(res)
            if (res.code == 200) {
                this.personInfo = res.data;
            }
        },
        //注销登录
        async logOut() {
            this.$confirm('确认注销登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await logOut();
                if (res.code == 200) {
                    this.$message.success(res.message);
                    this.$store.commit("resetAllStatus");
                    this.$router.replace({
                        path: "/"
                    })
                }
            }).catch(() => {});

        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/views/userInfo.scss";
</style>
