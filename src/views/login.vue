<template>
  <div class="login-page">
    <div class="form-area">
      <panel>
        <div class="login-form">
          <div class="title">
            登录
          </div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="42px" class="demo-ruleForm">
            <el-form-item label="账号" prop="pass">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
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
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          pass: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          checkPass: [
            {validator: checkPassword, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {},
    watch: {}
  }
</script>

<style scoped lang="scss">
  @import "@/style/views/login.scss";
</style>
