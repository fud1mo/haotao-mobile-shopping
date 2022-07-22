<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll"><cart-list /></scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar,
  },
  computed: {
    // mapGetters辅助函数的两种语法:
    // 1.数组语法
    // ...mapGetters(["cartLength"]),
    // 2.对象语法
    ...mapGetters({
      length: "cartLength",
    }),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style  scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  position: relative;
  z-index: 5;
}
.content {
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>