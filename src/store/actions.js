import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types"

export default {
  // 除了异步操作,判断逻辑也可以放到action中
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 判断payload是否为新添加的商品
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count++
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1;
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}