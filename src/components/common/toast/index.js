import Toast from "./Toast"

const obj = {}

obj.install = function (Vue) {
  // document.body.appendChild(Toast.$el)  //不可行，执行install函数时，Toast.$el的内容还没有挂载

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.根据new的方式，根据组件构造器，可以创建出一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是上面创建的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj