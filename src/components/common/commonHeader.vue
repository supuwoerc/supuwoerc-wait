<template>
  <div class="common-header-container">
    <div class="left">
      <div @click="goIndex()">
        <i class="iconfont icon-boke1 logo" style="color:#ffffff;"></i>
        <span class="logo">散夜</span>
      </div>
    </div>
    <div class="right">
      <div class="navbar">

        <el-menu :default-active="navActiveIndex" :router="true" class="el-menu-demo" mode="horizontal"
                 background-color="#ffffff" text-color="#333333" :active-text-color="$store.getters.getThemeColor">
          <template v-for="(item,index) in $store.getters.getNavigation" >
            <el-menu-item v-if="item&&item.children&&item.children.length==0" :key="index" :index="item.router">
              <i v-if="item.icon" :class="item.icon"></i>
              {{item.name}}
            </el-menu-item>
            <el-submenu :index="item.router" v-else :key="index">
              <template slot="title">{{item.name}}</template>
              <el-menu-item :index="cell.router" :key="cindex" v-for="(cell,cindex) in item.children">
                <i v-if="item.icon" :class="item.icon"></i>
                {{cell.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </div>
     <!-- <theme-color-selector :color="this.$store.getters.getThemeColor" @color-update="colorChange"/> -->
      <div class="setting">
        <i class="el-icon-setting" @click="switchMode()"></i>
      </div>
    </div>
    <!-- 主题切换弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" :width="dialogWidth" :custom-class="'theme-dialog'">
      <span class="tips">{{modeText}}</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="switchTheme()">确定</el-button>
        </span>
    </el-dialog>
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
      return {
        dialogVisible: false,
        visible: true,
        dialogWidth: "80%" //移动端的宽度   打开会判断分辨率修改
      };
    },
    computed: {
      navActiveIndex: function () {
        return this.$route.path; //nav默认激活
      },
      modeText: function () {
        return this.$store.getters.getThemeMode == 'light' ? '切换到暗黑模式?' : '切换到正常模式?';
      }
    },
    methods: {
      /**
       * 主题色变化事件
       */
      colorChange(color) {
        this.color = color;
        this.$notify({
          title: "成功",
          message: `已为您设置主题色为${color}`,
          type: "success",
          offset: 60
        });
      },
      goIndex() {
        this.$router.replace({
          path: "/"
        })
      },
      switchMode() {
        let cliwidth = document.body.clientWidth;
        if (cliwidth > 1200) {
          this.dialogWidth = "500px"
        }
        this.dialogVisible = true;
      },
      switchTheme() {
        this.dialogVisible = false;
        if (this.$store.getters.getThemeMode == 'light') {
          this.$store.commit("setThemeMode", "dark");
        } else {
          this.$store.commit("setThemeMode", "light");
        }
      }
    },
  };
</script>

<style lang="scss">
  @import "@/style/components/common/commonHeader.scss";
</style>
