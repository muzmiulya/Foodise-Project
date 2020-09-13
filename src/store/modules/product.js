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
      // state.totalRows = payload.pagination.totalData
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
          `http://127.0.0.1:3001/product?sort=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
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
          `http://127.0.0.1:3001/product/search/name?search=${context.state.search}&page=${context.state.page}&limit=${context.state.limit}`
        )
        .then(response => {
          console.log(response.data.pagination.totalData)
          context.commit('setProduct', response.data.data)
          context.commit('setTlRows', response.data.pagination.totalData)
          // const totalRows = response.data.length
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/product', payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateProducts(context, payload) {
      // console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3001/product/${payload.product_id}`,
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
      //   console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `http://127.0.0.1:3001/product/${payload.product_id}`,
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
