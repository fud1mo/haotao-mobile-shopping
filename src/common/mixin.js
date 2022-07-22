import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('我是混入的内容')
  }
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      showBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.backToTop(0, 0, 500);
    },
  }
}