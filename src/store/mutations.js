import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types"

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每一个方法完成的事情尽可能单一一点
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}