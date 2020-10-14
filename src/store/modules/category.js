import axios from 'axios'

export default {
  state: {
    category: [],
    categoryValue: [],
    roww: null,
    perP: 7
  },
  mutations: {
    setCategory(state, payload) {
      state.category = payload
    },
    setCategoryNameValue(state, payload) {
      const datas = payload.map(value => {
        const setData = {
          value: value.category_id,
          text: value.category_name
        }
        return setData
      })
      const categories = [{ value: '', text: 'Category' }, ...datas]
      state.categoryValue = categories
    },
    setRoww(state, payload) {
      state.roww = payload
    }
  },
  actions: {
    getCategory(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/category`)
        .then(response => {
          context.commit('setCategoryNameValue', response.data.data)
          context.commit('setCategory', response.data.data)
          context.commit('setRoww', response.data.data.length)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCategories(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/category`, payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/category/${payload.category_id}`,
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
    deleteCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}/category/${payload}`)
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
    getCategory(state) {
      return state.category
    },
    getRoww(state) {
      return state.roww
    },
    getPerP(state) {
      return state.perP
    },
    getCategoryValue(state) {
      return state.categoryValue
    }
  }
}
