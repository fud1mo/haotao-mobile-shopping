<template>
  <div id="app">
    <!-- 根据组件的name属性排除keep-alive -->
    <keep-alive exclude="Detail"><router-view /></keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/MainTabBar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
