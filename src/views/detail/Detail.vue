<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrolling="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="showBackTop" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetaiNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailInfo from "./childComps/DetailInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils.js";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: "",
      // show: false,
    };
  },
  mounted() {},
  created() {
    // 一.保存传入的iid
    this.iid = this.$route.params.iid;
    // 二.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
      // 4.获取商品详情信息
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick()会等DOM渲染完以后再回调内部的函数
      // 然而，DOM渲染完了，不代表图片加载完了，此时获取的offsetTop不包含图片高度
      // 一般情况下offsetTop值不对的时候，都是因为图片的问题
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    // 三.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    // 四.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      console.log(this.themeTopYs);
    }, 600);
  },
  methods: {
    // 将acions里的方法映射到组件的methods中
    ...mapActions(["addCart"]),
    detailImageLoad() {
      // console.log("--------");
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.backToTop(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      // 2.将positionY和主题中的值进行对比

      // 普通做法：
      // 情况一：
      // positionY在"商品"和“参数”高度之间时，index=0
      // positionY在"参数"和“评论”高度之间时，index=1
      // positionY在"评论"和“推荐”高度之间时，index=2
      // 情况二：
      // positionY在"推荐”高度以上时，index=3
      this.themeTopYs.forEach((value, i, arr) => {
        if (
          this.currentIndex !== i &&
          ((i < arr.length - 1 &&
            positionY >= value &&
            positionY < arr[i + 1]) ||
            (i === arr.length - 1 && positionY >= value))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      });

      // hack做法：
      // positionY在"商品"和“参数”高度之间时，index=0
      // positionY在"参数"和“评论”高度之间时，index=1
      // positionY在"评论"和“推荐”高度之间时，index=2
      // positionY在"推荐"和 Nuber.MaxValue 高度之间时，index=3(要向themeTopYs数组中添加一个Nuber.MaxValue)

      this.showBackTop = position.y < -640;
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.detailInfo.desc,
        price: this.goods.newPrice,
        iid: this.iid,
      };
      // 2.将商品添加到购物车
      // console.log(product);
      // actions可以返回promise
      // this.$store.dispatch("addCart", product).then((res) => console.log(res));
      // 经过映射可以这样写，本质上是上面这行函数
      this.addCart(product).then((res) => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        // }, 1500);
        this.$toast.show(res, 1500);
      });
    },
  },
  // updated() {
  //   this.themeTopYs = [];
  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  //   console.log(this.themeTopYs);
  // },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* 高度写100%是相对于父组件,即#detail,高度超过视口 */
  height: calc(100vh - 44px - 49px);
}
</style>