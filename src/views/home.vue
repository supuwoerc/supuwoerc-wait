<template>
  <div class="home-page">
    <div class="grid-menu">
      <div class="wow animate__zoomIn" data-wow-duration="1s">
        <panel>
          <div class="menu-item"></div>
        </panel>
      </div>
      <div class="wow animate__zoomIn" data-wow-duration="1s">
        <panel>
          <div class="menu-item"></div>
        </panel>
      </div>
      <div class="wow animate__zoomIn" data-wow-duration="1s">
        <panel>
          <div class="menu-item"></div>
        </panel>
      </div>
      <div class="wow animate__zoomIn" data-wow-duration="1s">
        <panel>
          <div class="menu-item"></div>
        </panel>
      </div>
    </div>
  </div>
</template>

<script>
import panel from "@/components/views/panel";
export default {
  name: "home",
  components: {
    panel,
  },
  data: function () {
    return {};
  },
  created() {},
  mounted() {
    new this.$wow.WOW({scrollContainer: '.home-page'}).init();
  },
  methods: {},
};
</script>

<style lang="scss">
@import "@/style/views/home.scss";
</style>
