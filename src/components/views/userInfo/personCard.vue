<template>
<div class="menu-item">
    <div class="title">
        <span>个人信息</span>
        <div>
            <i class="iconfont icon-setting" @click="editPersonInfo = true" v-show="!editPersonInfo" title="编辑"></i>
            <i class="iconfont icon-check" v-show="editPersonInfo" @click="saveUserInfo()" title="保存"></i>
            <i class="iconfont icon-logout" @click="logOut()" title="注销"></i>
        </div>
    </div>
    <div class="info person-card">
        <div class="left">
            <el-upload class="avatar-uploader" action="" :http-request="postAvatar" :show-file-list="false" :before-upload="beforeAvatarUpload">
                <el-image style="width: 70px;height:70px;border-radius:6px;" :src="$getServerSource(personInfo.avatar)" fit="fill">
                    <div slot="error" class="image-slot user-case">
                        {{(personInfo&&personInfo.nickname)?personInfo.nickname.substr(0,1):''}}
                    </div>
                </el-image>
            </el-upload>
        </div>
        <div class="right">
            <el-form :model="personInfo" label-position="left" size="small" label-width="55px">
                <el-form-item>
                    <div slot="label" class="form-label">账号:</div>
                    <el-input v-model="personInfo.username" disabled></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="form-label">昵称:</div>
                    <el-input v-model="personInfo.nickname" :disabled="!editPersonInfo"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="form-label">性别:</div>
                    <el-select v-model="personInfo.gender" placeholder="" :disabled="!editPersonInfo">
                        <el-option v-for="(item, index) in genderOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
import {
    getCurrentUserInfo,
    logOut,
    uploadAvatar,
    updateMineInfo
} from "@/api/api";
export default {
    name: 'personCard',
    components: {},
    data() {
        return {
            personInfo: {},
            editPersonInfo: false,
            genderOptions: [{
                    label: "保密",
                    value: 0,
                },
                {
                    label: "男",
                    value: 1,
                },
                {
                    label: "女",
                    value: 2,
                },
            ],
        };
    },
    computed: {},
    watch: {},
    created() {
        this.getUserinfo();
    },
    mounted() {},
    methods: {
        async postAvatar(param) {
            let p = new FormData();
            p.append("file", param.file);
            let res = await uploadAvatar(p);
            if (res && res.code == 200) {
                this.personInfo.avatar = res.data.url;
                this.saveUserInfo();
            }
        },
        async saveUserInfo() {
            let res = await updateMineInfo({
                avatar: this.personInfo.avatar,
                nickname: this.personInfo.nickname,
                gender: this.personInfo.gender
            });
            if (res && res.code == 200) {
                this.$message.success(res.message);
                this.editPersonInfo = false;
            }
        },
        beforeAvatarUpload(file) {
            const imgs = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
            const isJPG = imgs.includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error("上传头像图片格式错误!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小过大!");
            }
            return isJPG && isLt2M;
        },
        //个人信息
        async getUserinfo() {
            let res = await getCurrentUserInfo();
            console.log(res);
            if (res.code == 200) {
                this.personInfo = res.data;
            }
        },
        //注销登录
        async logOut() {
            this.$confirm("确认注销登录?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(async () => {
                    let res = await logOut();
                    if (res.code == 200) {
                        this.$message.success(res.message);
                        this.$store.commit("resetAllStatus");
                        this.$router.replace({
                            path: "/",
                        });
                    }
                })
                .catch(() => {});
        },
    },

    destroyed() {},
}
</script>

<style lang="scss" scoped>
@import "@/style/components/views/userInfo/personCard.scss";
</style>
