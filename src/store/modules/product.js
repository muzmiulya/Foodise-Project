import axios from 'axios'

export default {
  state: {
    page: 1,
    limit: 9,
    sort: '',
    search: '',
    products: [],
    totalRows: null,
    product_id: ''
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload
    },
    setSearch(state, payload) {
      state.search = payload
    },
    setPage(state, payload) {
      state.page = payload
    },
    setSort(state, payload) {
      state.sort = payload
    },
    setTlRows(state, payload) {
      state.totalRows = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/product?sort=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
        )
        .then(response => {
          context.commit('setProduct', response.data.data)
          context.commit('setTlRows', response.data.pagination.totalData)
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchProduct(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/product/search/name?search=${context.state.search}&page=${context.state.page}&limit=${context.state.limit}`
        )
        .then(response => {
          context.commit('setProduct', response.data.data)
          context.commit('setTlRows', response.data.pagination.totalData)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/product`, payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/product/${payload.product_id}`,
            payload.form
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `${process.env.VUE_APP_URL}/product/${payload.product_id}`,
            payload.form
          )
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
    getLimit(state) {
      return state.limit
    },
    getTotalRows(state) {
      return state.totalRows
    },
    getPage(state) {
      return state.page
    },
    getSort(state) {
      return state.sort
    },
    getSearch(state) {
      return state.search
    },
    getProduct(state) {
      return state.products
    }
  }
}
