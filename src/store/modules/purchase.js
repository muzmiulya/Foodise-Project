// import axios from 'axios'

export default {
  state: {
    cart: []
  },
  mutations: {
    addToCarts(state, payload) {
      const setCart = {
        product_id: payload.product_id,
        purchase_qty: 1,
        product_name: payload.product_name,
        product_price: payload.product_price
      }
      const fixedData = [...state.cart, setCart]
      const addedItem = fixedData.find(
        item => item.product_id === payload.product_id
      )
      const existItem = state.cart.find(
        item => item.product_id === payload.product_id
      )
      if (existItem) {
        addedItem.product_total = payload.product_price * payload.qty
        addedItem.purchase_qty += 1
      } else {
        state.cart = [...state.cart, setCart]
      }
    }
  },
  actions: {},
  getters: {
    getCart(state) {
      return state.cart
    }
  }
}
