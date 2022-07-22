<template>
  <div class="shop-product">
    <div class="product-selector">
      <check-button :is-checked="product.checked" @click.native="checkClick" />
    </div>
    <div class="product-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="product-info">
      <div class="product-title">{{ product.title }}</div>
      <div class="product-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="product-price">￥{{ product.price }}</div>
        <div class="product-count">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style scoped>
.shop-product {
  display: flex;
  /* align-items: center; */
  padding: 8px 5px;
  border-bottom: 1px solid #ddd;
}
.product-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-title,
.product-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-img {
  padding: 5px;
}
.product-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.product-info {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  padding: 5px 10px;
  overflow: hidden;
}
.product-title {
  font-size: 16px;
}
.product-desc {
  flex: 1;
  margin-top: 12px;
}
.info-bottom {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}
.info-bottom .product-price {
  color: var(--color-high-text);
}
</style>