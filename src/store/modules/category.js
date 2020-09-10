import axios from 'axios'

export default {
  state: {
    category: []
  },
  mutations: {
    setCategory(state, payload) {
      state.category = payload
      //   console.log(payload)
    }
  },
  actions: {
    getCategory(context, payload) {
      axios
        .get('http://127.0.0.1:3001/category')
        .then(response => {
          const datas = response.data.data.map(value => {
            const setData = {
              value: value.category_id,
              text: value.category_name
            }
            return setData
          })
          const categories = [{ value: '', text: 'Category' }, ...datas]
          //   console.log(categories)
          context.commit('setCategory', categories)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCategories(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/category', payload)
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
    }
  }
}
