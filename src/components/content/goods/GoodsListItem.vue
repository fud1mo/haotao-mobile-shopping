<template>
  <div class="item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imgLoad" />
    <div>
      <p class="descrip">{{ goodsItem.title }}</p>
      <span class="price"><span>￥</span>{{ goodsItem.price }}</span>
      <del>{{ goodsItem.orgPrice }}</del>
      <p class="sale">{{ showSale }}人付款</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
    showSale() {
      return this.goodsItem.sale || this.goodsItem.itemSale;
    },
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("itemImgLoad");
      // 按照教程写的代码，实际在scroll中用了observeDOM以后不需要这些监听图片的代码，这个事件只需要在detail中监听，用于导航定位高度的获取
      // if (this.$route.path.indexOf("/home") !== -1) {
      //   this.$bus.$emit("homeItemImaLoad");
      // } else if (this.$route.path.indexOf("/detail") !== -1) {
      //   this.$bus.$emit("detailItemImaLoad");
      // }
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.item {
  width: 47%;
  margin-bottom: 8px;
}
img {
  width: 100%;
  border-radius: 4%;
}
.descrip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  padding: 4px 0;
}
.price {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-high-text);
  padding-right: 6px;
}
.price span {
  font-size: 14px;
}
del {
  font-size: 14px;
}
.sale {
  font-size: 14px;
  color: #999;
  padding: 2px 0;
}
</style>