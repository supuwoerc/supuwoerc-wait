<template>
  <div id="app">
    <el-container>
      <el-header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import '@/style/common/reset.scss';
@import '@/style/common/border.scss';
@import '@/style/common/app.scss';
</style>
