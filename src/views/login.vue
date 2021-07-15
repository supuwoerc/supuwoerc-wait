<template>
<div class="login-page">
    <div class="form-area">
        <panel>
            <div class="login-form">
                <div class="title">
                    用户登录
                </div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="pass">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="checkCode">
                        <el-row type="flex" justify="space-between">
                            <el-col :span="14">
                                <el-input type="password" v-model="ruleForm.code" autocomplete="off"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-image style="height:40px;" :src="smsCode" fit="fill" @click="getCaptchaCode()"></el-image>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </panel>
    </div>
</div>
</template>

<script>
import {
    getServerData
} from "../api/api";
export default {
    name: "login",
    components: {
        panel: () => import("@/components/views/panel")
    },
    data: function () {
        let checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请填写账号'));
            }
            callback();
        };
        let checkPassword = (rule, value, callback) => {
            if (!value || value == '') {
                return callback(new Error('请填写密码'));
            }
            callback();
        };
        let checkCode = (rule, value, callback) => {
            if (!value || value == '') {
                return callback(new Error('请填写验证码'));
            }
            callback();
        };
        return {
            ruleForm: {
                username: '',
                password: '',
                code: ''
            },
            smsCode: "",
            rules: {
                pass: [{
                    validator: checkUsername,
                    trigger: 'blur'
                }],
                checkPass: [{
                    validator: checkPassword,
                    trigger: 'blur'
                }],
                checkCode: [{
                    validator: checkCode,
                    trigger: 'blur'
                }]
            }
        }
    },
    created() {
        this.getCaptchaCode();
    },
    mounted() {},
    methods: {
        async getCaptchaCode() {
            console.log(getServerData)
            let res = await getServerData("/captcha", null);
            console.log(res)
            if (res.code == 200) {
                this.smsCode = res.data.code2Base64;
            }else{
              this.$message.error("验证码获取错误");
            }
        }
    },
    watch: {}
}
</script>

<style lang="scss" scoped>
@import "@/style/views/login.scss";
</style>
