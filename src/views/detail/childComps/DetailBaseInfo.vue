<template>
  <!-- 判断goods是不是一个空对象,如果是空对象则不渲染 -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">￥{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span
        class="discount"
        :style="{ backgroundColor: goods.discountColor }"
        >{{ goods.discount }}</span
      >
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[0].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index].icon" alt="" />
        <span>{{ goods.services[index].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  padding: 0 10px;
  margin-top: 12px;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  font-size: 17px;
  line-height: 23px;
}
.info-price {
  margin: 8px 0 12px;
}
.n-price {
  color: var(--color-high-text);
  font-size: 18px;
  font-weight: 700;
  margin-right: 6px;
}
.o-price {
  color: #999;
  font-size: 14px;
  margin-right: 6px;
  text-decoration: line-through;
}
.discount {
  display: inline-block;
  color: #fff;
  font-size: 14px;
  padding: 1px 4px;
  border-radius: 6px;
}
.info-other {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  padding-bottom: 7px;
}
.info-service {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 15px 0;
}
.info-service-item img {
  width: 12px;
  vertical-align: middle;
  margin-right: 2px;
}
</style>