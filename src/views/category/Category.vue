<template>
  <div class="wrapper">
    <ul>
      <li>分类滚动区域1</li>
      <li>分类滚动区域2</li>
      <li>分类滚动区域3</li>
      <li>分类滚动区域4</li>
      <li>分类滚动区域5</li>
      <li>分类滚动区域6</li>
      <li>分类滚动区域7</li>
      <li>分类滚动区域8</li>
      <li>分类滚动区域9</li>
      <li>分类滚动区域10</li>
      <li>分类滚动区域11</li>
      <li>分类滚动区域12</li>
      <li>分类滚动区域13</li>
      <li>分类滚动区域14</li>
      <li>分类滚动区域15</li>
      <li>分类滚动区域16</li>
      <li>分类滚动区域17</li>
      <li>分类滚动区域18</li>
      <li>分类滚动区域19</li>
      <li>分类滚动区域20</li>
      <li>分类滚动区域21</li>
      <li>分类滚动区域22</li>
      <li>分类滚动区域23</li>
      <li>分类滚动区域24</li>
      <li>分类滚动区域25</li>
      <li>分类滚动区域26</li>
      <li>分类滚动区域27</li>
      <li>分类滚动区域28</li>
      <li>分类滚动区域29</li>
      <li>分类滚动区域30</li>
      <li>分类滚动区域31</li>
      <li>分类滚动区域32</li>
      <li>分类滚动区域33</li>
      <li>分类滚动区域34</li>
      <li>分类滚动区域35</li>
      <li>分类滚动区域36</li>
      <li>分类滚动区域37</li>
      <li>分类滚动区域38</li>
      <li>分类滚动区域39</li>
      <li>分类滚动区域40</li>
      <li>分类滚动区域41</li>
      <li>分类滚动区域42</li>
      <li>分类滚动区域43</li>
      <li>分类滚动区域44</li>
      <li>分类滚动区域45</li>
      <li>分类滚动区域46</li>
      <li>分类滚动区域47</li>
      <li>分类滚动区域48</li>
      <li>分类滚动区域49</li>
      <li>分类滚动区域50</li>
      <li>分类滚动区域51</li>
      <li>分类滚动区域52</li>
      <li>分类滚动区域53</li>
      <li>分类滚动区域54</li>
      <li>分类滚动区域55</li>
      <li>分类滚动区域56</li>
      <li>分类滚动区域57</li>
      <li>分类滚动区域58</li>
      <li>分类滚动区域59</li>
      <li>分类滚动区域60</li>
      <li>分类滚动区域61</li>
      <li>分类滚动区域62</li>
      <li>分类滚动区域63</li>
      <li>分类滚动区域64</li>
      <li>分类滚动区域65</li>
      <li>分类滚动区域66</li>
      <li>分类滚动区域67</li>
      <li>分类滚动区域68</li>
      <li>分类滚动区域69</li>
      <li>分类滚动区域70</li>
      <li>分类滚动区域71</li>
      <li>分类滚动区域72</li>
      <li>分类滚动区域73</li>
      <li>分类滚动区域74</li>
      <li>分类滚动区域75</li>
      <li>分类滚动区域76</li>
      <li>分类滚动区域77</li>
      <li>分类滚动区域78</li>
      <li>分类滚动区域79</li>
      <li>分类滚动区域80</li>
      <li>分类滚动区域81</li>
      <li>分类滚动区域82</li>
      <li>分类滚动区域83</li>
      <li>分类滚动区域84</li>
      <li>分类滚动区域85</li>
      <li>分类滚动区域86</li>
      <li>分类滚动区域87</li>
      <li>分类滚动区域88</li>
      <li>分类滚动区域89</li>
      <li>分类滚动区域90</li>
      <li>分类滚动区域91</li>
      <li>分类滚动区域92</li>
      <li>分类滚动区域93</li>
      <li>分类滚动区域94</li>
      <li>分类滚动区域95</li>
      <li>分类滚动区域96</li>
      <li>分类滚动区域97</li>
      <li>分类滚动区域98</li>
      <li>分类滚动区域99</li>
      <li>分类滚动区域100</li>
    </ul>
  </div>
</template>

<script>
// better-scroll主要可以用于实现划到底部和顶部的弹簧效果
// 使用要求：外层一个元素包裹，内层滚动的只有一个元素（元素内部再包含多个元素）
import BScroll from "@better-scroll/core";
// pullup 插件为 BetterScroll 扩展上拉加载的能力。
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);
export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  // 挂载完成,HTML已经被渲染到了页面上,这个阶段可以执行dom操作
  mounted() {
    // BScroll()的参数是el，和vue的el很像，所以要传入一个元素来挂载，可以用DOM获取，也可以直接写类名，让它自己查找对应的标签
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      probeType: 3,
      pullUpLoad: true,
    });
    // probeType作用：决定是否派发 scroll 事件，probeType 为 0，在任何时候都不派发 scroll 事件，
    // probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，probeType为1要设置momentumLimitTime才会侦测
    // 1：非实时（屏幕滑动超过一定时间后）派发scroll 事件；2：在屏幕滑动的过程中实时派发 scroll 事件；3：不仅在屏幕滑动的过程中，而且在滚动动画运行过程中实时派发 scroll 事件。
    this.scroll.on("scroll", (position) => {
      // console.log(position);
    });
    // pullingUp事件：上拉加载动作
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      // 发送网络请求，请求更多页的数据
      // 等数据请求完成，并且将新的数据展示出来后,主动调用 finishPullUp() 告诉 BetterScroll 准备好下一次的 pullingUp 钩子
      setTimeout(() => {
        // 2秒之后才能做下一次上拉加载动作
        this.scroll.finishPullUp();
      }, 2000);
    });
  },
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: #ddd;
  overflow: hidden;
}
</style>