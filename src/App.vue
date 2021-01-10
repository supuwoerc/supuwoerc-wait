<template>
  <div id="app">
    <el-container>
      <el-header>123</el-header>
      <el-main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "App",
  watch: {
    $route(newValue, oldValue) {
      if (newValue.meta && newValue.meta.pageName) {
        document.title = newValue.meta.pageName;
      }
    },
  },
  methods: {},
};
</script>

<style lang="scss">
@import "@/style/common/reset.scss";
@import "@/style/common/border.scss";
@import "@/style/common/app.scss";
</style>
