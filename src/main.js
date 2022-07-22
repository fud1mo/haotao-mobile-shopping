import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload"

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// Vue.use实际是调用里面的install函数

// 解决移动端300ms延迟问题
// 步骤：1.安装 > 2.导入 > 3.调用attach方法
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
// 将Vue实例挂载到app上
