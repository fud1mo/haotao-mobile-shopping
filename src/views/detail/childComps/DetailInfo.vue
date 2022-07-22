<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="detail-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <!-- <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
      />
    </div> -->
    <div v-for="(item, index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          v-for="(imgs, indey) in item.list"
          :key="indey"
          :src="imgs"
          @load="imageLoad"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      this.$emit("detailImageLoad");
    },
  },
};
</script>

<style scoped>
.detail-info {
  padding: 20px 10px;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  position: relative;
}
.desc {
  padding: 16px 0;
  font-size: 14px;
  line-height: 1.5;
}
.start,
.end {
  height: 1px;
  width: 100px;
  background-color: #333;
}
.start::before,
.end::after {
  content: "";
  display: block;
  height: 6px;
  width: 6px;
  background-color: #444;
  position: relative;
  bottom: 3px;
}
.end {
  position: absolute;
  right: 0;
}
.end::after {
  position: relative;
  left: 94px;
}
.info-key {
  padding: 16px 0 12px;
  /* font-weight: 600; */
  color: #333;
}
.info-list {
  margin: 0 -10px;
}
.info-list img {
  width: 100%;
  /* 消除图片自带的下方白条 */
  vertical-align: middle;
}
</style>