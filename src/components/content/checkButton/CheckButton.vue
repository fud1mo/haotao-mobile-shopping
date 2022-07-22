<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #ccc;
  width: 16px;
  height: 16px;
  text-align: center;
}
.check-button img {
  width: 80%;
}
.check {
  background-color: var(--color-high-text);
  border-color: var(--color-high-text);
}
</style>