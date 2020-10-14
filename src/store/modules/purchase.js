import axios from 'axios'

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
        product_price: payload.product_price,
        product_picture: payload.product_picture
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
    },
    incrementQty(state, payload) {
      const incrementData = state.cart.find(
        value => value.product_id === payload.product_id
      )
      incrementData.purchase_qty += 1
    },
    decrementQty(state, payload) {
      const decrementData = state.cart.find(
        value => value.product_id === payload.product_id
      )
      decrementData.purchase_qty -= 1
    }
  },
  actions: {
    postOrder(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/purchase`, payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getCart(state) {
      return state.cart
    },
    computedSum(state) {
      const sums = state.cart.map(value => {
        return value.purchase_qty * value.product_price
      })
      return sums.reduce((a, b) => a + b)
    }
  }
}
