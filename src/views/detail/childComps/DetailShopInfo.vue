<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{ shop.sells | sellsCount }}万</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="level" :class="{ 'level-better': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <span class="enter-shop">进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellsCount(sells) {
      return (sells / 10000).toFixed(2);
    },
  },
};
</script>

<style scoped>
.shop-info {
  padding: 16px 10px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top img {
  width: 40px;
  border-radius: 50%;
  border: 2px solid #f2f5f8;
  vertical-align: middle;
  margin-right: 8px;
}
.shop-top span {
  font-size: 17px;
}
.shop-middle {
  padding: 16px 0;
  display: flex;
  align-items: center;
}
.shop-middle-item {
  width: 50%;
  display: flex;
  justify-content: space-around;
}
.shop-middle-left {
  border-right: 2px solid #ddd;
  text-align: center;
}
.sells-count,
.goods-count {
  padding-bottom: 8px;
}
.sells-text,
.goods-text {
  font-size: 14px;
}
.shop-middle-right {
  font-size: 13px;
}
.shop-middle-right table td {
  padding: 4px 7px;
}
.score {
  color: #77c600;
}
.score-better {
  color: red;
}
.level span {
  color: #fff;
  background-color: #77c600;
  padding: 1.5px;
  border-radius: 20%;
}
.level-better span {
  background-color: red;
}
.shop-bottom {
  text-align: center;
  font-size: 14px;
}
.shop-bottom span {
  display: inline-block;
  background-color: #f2f5f8;
  border-radius: 4px;
  padding: 6px 32px;
}
</style>