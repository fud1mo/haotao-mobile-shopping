<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <!-- 这个scroll元素就等价于组件里最外面的那个元素，给它设置高度就是给组件里的wrapper设置高度,scroll元素的子元素则会替代掉插槽元素 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrolling="contentScroll"
      :pull-up-load="true"
      @pulling="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件不能直接监听点击，如果监听需要加.native。但vue3不加也可以监听 -->
    <!-- 当然也可以直接在外层套一个div来监听 -->
    <back-top @click.native="backClick" v-show="showBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils.js";
import { backTopMixin } from "common/mixin.js";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
  },
  mixins: [backTopMixin],
  data() {
    return {
      // 用于存储请求到的数据
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 组件一旦创建好就发送请求（利用生命周期函数）
  created() {
    // 1.请求多个数据
    this.getHomeMulti();
    // 2.请求商品数据
    this.getHomeGo("pop");
    this.getHomeGo("new");
    this.getHomeGo("sell");
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.backToTop(0, this.saveY, 0);
  },
  // mounted() {
  //   let newRefresh = debounce(this.$refs.scroll.refresh, 100);
  //   this.$bus.$on("itemImgLoad", () => {
  //     newRefresh();
  //   });
  // },
  deactivated() {
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log("deactivated", this.saveY);
  },
  methods: {
    //  ------------------事件监听相关方法------------------
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
        // break作用：阻止穿透，跳出循环，最后一步这里没有default，可以不写break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部抽取到mixin中了
    // backClick() {
    //   // 通过this.$refs.scroll拿到scroll组件对象（父访问子）
    //   // 方法一：访问它的scroll属性，再调用scrollTo(),改方法的参数：x坐标、y坐标、滚动时间
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    //   // 方法二：调用组件的backToTop方法
    //   this.$refs.scroll.backToTop(0, 0, 500);
    // },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      // if (position.y < -640) {
      //   this.showBackTop = true;
      // } else {
      //   this.showBackTop = false;
      // }
      // 优化写法：
      this.showBackTop = position.y < -this.tabOffsetTop;

      // 2.判断tabControl是否吸顶（position: fixed）
      this.isTabFixed = -position.y >= this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGo(this.currentType);
    },
    swiperImageLoad() {
      // 获取tab栏的OffsetTop值
      // 组件没有offsetTop属性，但所有的组件都有一个属性$el，用于获取组件中的元素
      // 但如果直接在mounted中获取offsetTop，此时图片没加载完，获取到的就不准确，这里主要监听轮播图的图片，加载完成后再获取tab栏的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //  ------------------网络请求相关方法------------------
    getHomeMulti() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 箭头函数中的this指向，是函数创建的上下文的this
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGo(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // 保存数据
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
        // 完成上拉加载更多
        // 加定时器可以用于避免短时间内连续加载
        // setTimeout(() => {
        //   this.$refs.scroll.finishPulling();
        // }, 300);
        this.$refs.scroll.finishPulling();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* vh:视口高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用浏览器原生滚动时使用 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 设置上下滚动的wrapper高度，要考虑不同屏幕适配 */
/* 方案一：计算属性 */
/* .content {
  height: calc(100% - 49px);
  overflow: hidden;
} */

/* 方案二：定位 */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>