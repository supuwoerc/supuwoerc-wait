<template>
  <div id="app">
    <el-container>
      <el-header>
        <common-header />
      </el-header>
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
import commonHeader from "@/components/common/commonHeader";
export default {
  name: "App",
  components: {
    commonHeader,
  },
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
