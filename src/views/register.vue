<template>
<div class="login-page">
    <div class="form-area">
        <panel>
            <div class="login-form">
                <div class="title">用户注册</div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                    <el-form-item label="邮箱" prop="username">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="repassword">
                        <el-input type="password" v-model="ruleForm.repassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-row type="flex" justify="space-between">
                            <el-col :span="14">
                                <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
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
                                <div class="tips-register" @click="goLogin()">已有账号?去登录</div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-loading="loading" @click="submitForm()">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </panel>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>注册成功,请查收邮件激活账号后登录</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">好的</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
import {
    getCaptcha,
    doRegister
} from "../api/api";
export default {
    name: "register",
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
            if (!value || value.trim() == "") {
                return callback(new Error("请填写密码"));
            }
            if (value.length < 6 || value.length > 12) {
                return callback(new Error("账号长度必须在6-12之间"));
            }
            callback();
        };
        let checkRePass = (rule, value, callback) => {
            if (!value || value.trim() == "" || value != this.ruleForm.password) {
                return callback(new Error("两次密码不一致"));
            }
            callback();
        };
        let checkCode = (rule, value, callback) => {
            if (!value || value.trim() == "") {
                return callback(new Error("请填写验证码"));
            }
            callback();
        };
        return {
            dialogVisible: false,
            ruleForm: {
                username: "",
                password: "",
                repassword: "",
                code: "",
                codeKey: "",
            },
            smsCode: "",
            loading: false,
            rules: {
                username: [{
                    validator: checkUsername,
                    trigger: "blur",
                }, ],
                password: [{
                    validator: checkPassword,
                    trigger: "blur",
                }, ],
                repassword: [{
                    validator: checkRePass,
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
        submitForm() {
            if (localStorage.getItem("Sanye-Authorization")) {
                localStorage.removeItem("Sanye-Authorization");
            }
            this.$refs['ruleForm'].validate(async (valid) => {
                if (valid) {
                    let params = this.ruleForm;
                    this.loading = true;
                    let res = await doRegister(params);
                    this.loading = false;
                    if (res.code == 200) {
                        this.$message.success(res.message);
                        this.resetForm();
                        this.dialogVisible = true;
                    }
                    this.getCaptchaCode();
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs['ruleForm'].resetFields();
        },
        goLogin() {
            this.$router.replace({
                path: `/login`
            })
        },
        async getUSerInfo() {
            let res = await getServerData("/user/info", null);
            console.log(res)
        }
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/views/login.scss";
</style>
