<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多<img src="~assets/img/common/back.svg" class="more-img" />
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-content">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <!-- <span class="date">{{ myDate(commentInfo.created) }}</span> -->
        <span class="date">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img
          v-for="(item, index) in commentInfo.images"
          :key="index"
          :src="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils.js";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      // 1.将时间戳转化成Date对象
      const date = new Date(value * 1000);
      // 2.将date格式化
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  // methods: {
  //   myDate(value, type = 0) {
  //     var time = new Date(value * 1000);
  //     var year = time.getFullYear();
  //     var month = time.getMonth() + 1;
  //     var date = time.getDate();
  //     var hour = time.getHours();
  //     var minute = time.getMinutes();
  //     var second = time.getSeconds();
  //     month = month < 10 ? "0" + month : month;
  //     date = date < 10 ? "0" + date : date;
  //     hour = hour < 10 ? "0" + hour : hour;
  //     minute = minute < 10 ? "0" + minute : minute;
  //     second = second < 10 ? "0" + second : second;
  //     var arr = [
  //       year + "-" + month + "-" + date,
  //       year +
  //         "-" +
  //         month +
  //         "-" +
  //         date +
  //         " " +
  //         hour +
  //         ":" +
  //         minute +
  //         ":" +
  //         second,
  //       year + "年" + month + "月" + date,
  //       year +
  //         "年" +
  //         month +
  //         "月" +
  //         date +
  //         " " +
  //         hour +
  //         ":" +
  //         minute +
  //         ":" +
  //         second,
  //       hour + ":" + minute + ":" + second,
  //     ];
  //     return arr[type];
  //   },
  // },
};
</script>

<style scoped>
.comment-info {
  padding: 5px 10px;
  border-bottom: 5px solid #f2f5f8;
  color: #333;
}
.info-header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.header-title {
  font-size: 15px;
}
.header-more {
  font-size: 13px;
}
.more-img {
  width: 10px;
  transform: rotate(180deg);
  margin-left: 5px;
}
.info-user {
  padding: 10px 0;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  vertical-align: middle;
}
.info-user span {
  font-size: 15px;
  margin-left: 10px;
}
.info-content {
  padding: 0 5px 12px;
}
.info-content p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-content .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-other .date {
  margin-right: 10px;
}
.info-imgs {
  margin-top: 10px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>