<template>
<div class="login-page">
    <div class="form-area zoomer">
        <panel>
            <div class="login-form">
                <div class="title">用户登录</div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="username">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="true"></el-input>
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
                        <el-row type="flex" justify="space-between" align="middle">
                            <el-col :span="8">
                                <el-button type="primary" @click="submitForm()">提交</el-button>
                            </el-col>
                            <el-col :span="10">
                                <div class="tips-register" @click="reSendEmail()">
                                    未激活?<i :style="{color:$store.getters.getThemeColor,fontSize:'22px'}" class="el-icon-info"></i>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </panel>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>账户未激活,请查收邮件激活后登录</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">好的</el-button>
        </span>
    </el-dialog>
    <el-dialog title="邮件激活" :visible.sync="dialogVisibleActive" width="30%">
        <el-form :model="ruleForm" ref="activeForm" :rules="rules">
            <el-form-item style="margin:0" label="" label-width="0" prop="username">
                <el-input style="width:100% !important;" placeholder="填写您的邮箱" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" :disabled="isDisabled" @click="submitActive()">{{buttonName}}</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {
    getCaptcha,
    doLogin,
    activeAccount
} from "../api/api";
export default {
    name: "login",
    components: {
        panel: () => import("@/components/views/panel"),
    },
    data: function () {
        let checkUsername = (rule, value, callback) => {
            let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!value || value.trim() == "") {
                return callback(new Error("请填写邮箱"));
            }
            if (!reg.test(value)) {
                return callback(new Error("邮箱格式不正确"));
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
            dialogVisible: false,
            dialogVisibleActive: false,
            ruleForm: {
                username: "",
                password: "",
                code: "",
                codeKey: ""
            },
            smsCode: "",
            time: 60,
            isDisabled: false,
            buttonName: "获取",
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
            let res = await getCaptcha();
            if (res.code == 200) {
                this.smsCode = res.data.code2Base64;
                this.ruleForm.codeKey = res.data.codeKey;
            } else {
                this.$message.error("验证码获取失败");
            }
        },
        async submitForm() {
            if (localStorage.getItem("Sanye-Authorization")) {
                localStorage.removeItem("Sanye-Authorization");
            }
            this.$refs['ruleForm'].validate(async (valid) => {
                if (valid) {
                    let params = this.ruleForm;
                    let res = await doLogin(params);
                    if (res.code == 200) {
                        localStorage.setItem("Sanye-Authorization", res.data.token);
                        this.$message.success(res.message);
                        this.$store.commit("setLoginStatus", true);
                        this.$router.push({
                            path: "/"
                        })
                    }
                    if (res.code == 555) {
                        this.dialogVisible = true;
                    }
                } else {
                    return false;
                }
            });
        },
        reSendEmail() {
            this.dialogVisibleActive = true;
        },
        async submitActive() {
            let me = this;
            this.$refs['activeForm'].validate(async (valid) => {
                if (valid) {
                    me.isDisabled = true;
                    let interval = window.setInterval(function () {
                        me.buttonName = me.time+"s";
                        --me.time;
                        if (me.time < 0) {
                            me.buttonName = "获取";
                            me.time = 60;
                            me.isDisabled = false;
                            window.clearInterval(interval);
                        }
                    }, 1000);
                    let res = await activeAccount(me.ruleForm.username);
                    if(res&&res.code==200){
                        this.$message.success(res.message);
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
