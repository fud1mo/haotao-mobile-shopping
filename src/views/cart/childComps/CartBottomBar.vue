<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" @click.native="checkClick" /><span
        >全选</span
      >
    </div>
    <div class="price">合计:￥{{ totoalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totoalPrice() {
      // 因为mapGetters，所以可以直接用cartList，原来的this.$store.state.cartList可以写成this.cartList
      return this.cartList
        .filter((product) => product.checked)
        .reduce((preValue, product) => {
          return product.price * product.count + preValue;
        }, 0)
        .toFixed(2);
    },
    checkedLength() {
      return this.cartList.filter((product) => product.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      } else {
        // 方法一（filter）：没选中的有长度，说明没有全选.没长度，说明全选了
        // return this.cartList.filter((product) => !product.checked).length === 0;
        // -------------------方法二、三找到一个就停，性能高
        // 方法二（every）：
        // return this.cartList.every((product) => product.checked);
        // 方法三（find/some）：
        return !this.cartList.find((product) => !product.checked);
      }
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((product) => (product.checked = false));
      } else {
        this.cartList.forEach((product) => (product.checked = true));
      }
      // 不能做下面的简化，因为遍历过程中product.checked和this.isSelectAll的值相互影响，导致一次完整的遍历过程中this.isSelectAll的值不固定
      // this.cartList.forEach((product) => (product.checked = !this.isSelectAll));
    },
    calcClick() {
      if (this.checkedLength === 0) {
        this.$toast.show("请选择要购买的商品", 1500);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-content span {
  margin-left: 8px;
}
.price {
  margin-left: 24px;
  flex: 1;
}
.calculate {
  background-color: var(--color-high-text);
  line-height: 40px;
  padding: 0 16px;
  color: #fff;
}
</style>