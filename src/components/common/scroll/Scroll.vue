<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
// observe-dom:开启对 content 以及 content 子元素 DOM 改变的探测。当插件被使用后，当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法。
// refresh 方法:重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
import ObserveDOM from "@better-scroll/observe-dom";
// 开启对 wrapper 子元素中图片元素的加载的探测。无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度，新增于 v2.1.0 版本。
import ObserveImage from "@better-scroll/observe-image";
BScroll.use(Pullup);
BScroll.use(ObserveDOM);
BScroll.use(ObserveImage);

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 1.创建BScroll对象
    // document.querySelector(".wrapper")获取元素有可能不准确，可能外层也有一个同类名的元素，此时很可能获取不准确
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      observeImage: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scrolling", position);
      });
    }
    // 3.监听scroll滚动到底部（上拉加载更多）
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 监听到滚动到底部
        this.$emit("pulling");
        // 在Home.vue中网络请求后完成上拉加载更多
      });
    }
  },
  methods: {
    // 下列方法中&&的作用：先判断this.scroll有没有值，有值再调用它的方法
    // time给个默认值300
    backToTop(x, y, time = 300) {
      // 这个scrollTo是它本身具有的方法
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPulling() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>