<template>
<div class="login-page">
    <div class="form-area zoomer">
        <panel>
            <div class="login-form">
                <div class="title">用户登录</div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="username">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-row type="flex" justify="space-between">
                            <el-col :span="14">
                                <el-input type="password" v-model="ruleForm.code" autocomplete="off"></el-input>
                            </el-col>
                            <el-col :span="8" style="height: 40px;">
                                <el-image style="height: 40px;width:100%;" :src="smsCode" fit="fill" @click="getCaptchaCode()"></el-image>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="" size="mini">
                        <el-row type="flex" justify="space-between">
                            <el-col :span="8">
                            </el-col>
                            <el-col :span="16">
                                <div class="tips-register" @click="goRegister()">没有账号?去注册</div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </panel>
    </div>
</div>
</template>

<script>
import {
    getServerData,
    postServerData
} from "../api/api";
export default {
    name: "login",
    components: {
        panel: () => import("@/components/views/panel"),
    },
    data: function () {
        let checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请填写账号"));
            }
            callback();
        };
        let checkPassword = (rule, value, callback) => {
            if (!value || value == "") {
                return callback(new Error("请填写密码"));
            }
            callback();
        };
        let checkCode = (rule, value, callback) => {
            if (!value || value == "") {
                return callback(new Error("请填写验证码"));
            }
            callback();
        };
        return {
            ruleForm: {
                username: "",
                password: "",
                code: "",
                codeKey: ""
            },
            smsCode: "",
            rules: {
                username: [{
                    validator: checkUsername,
                    trigger: "blur",
                }, ],
                password: [{
                    validator: checkPassword,
                    trigger: "blur",
                }, ],
                code: [{
                    validator: checkCode,
                    trigger: "blur",
                }, ],
            },
        };
    },
    created() {
        this.getCaptchaCode();
    },
    mounted() {},
    methods: {
        async getCaptchaCode() {
            console.log(getServerData);
            let res = await getServerData("/captcha", null);
            console.log(res);
            if (res.code == 200) {
                this.smsCode = res.data.code2Base64;
                this.ruleForm.codeKey = res.data.codeKey;
            } else {
                this.$message.error("验证码获取失败");
            }
        },
        async submitForm() {
            if(localStorage.getItem("Sanye-Authorization")){
                this.$message.error("当前为登录状态");
                return;
            }
            this.$refs['ruleForm'].validate(async (valid) => {
                if (valid) {
                    let params = {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password,
                        codeKey: this.ruleForm.codeKey,
                        code: this.ruleForm.code,
                    }
                    let res = await postServerData("/login/submit", params,{"Content-Type":"application/x-www-form-urlencoded"});
                    if (res.code == 200) {
                        localStorage.setItem("Sanye-Authorization",res.data.token);
                        this.$message.success(res.message);
                        this.$router.push({
                            path:"/"
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        goRegister() {
            this.$router.replace({
                path: `/register`
            })
        }
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/views/login.scss";
</style>
