import axios from 'axios'
import router from '../../router/index'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null,
    users: [],
    pagess: 1,
    perPages: 7,
    totallRows: null,
    user_id: ''
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    delUser(state) {
      state.user = {}
      state.token = null
    },
    setAllUser(state, payload) {
      state.users = payload
    },
    setPagess(state, payload) {
      state.pagess = payload
    },
    setTotallRows(state, payload) {
      state.totallRows = payload
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/users/login`, payload)
          .then(response => {
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      sessionStorage.clear()
      context.commit('delUser')
      router.push('/login')
    },
    addUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/users/register`, payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getAllUser(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/users/user`)
        .then(response => {
          context.commit('setAllUser', response.data.data)
          const totallRows = response.data.data.length
          context.commit('setTotallRows', totallRows)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/patch/${payload.user_id}`,
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
    deleteUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}/users/delete/${payload}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    interceptorRequest(context) {
      axios.interceptors.request.use(
        function (config) {
          config.headers.authorization = `Bearer ${context.state.token}`
          return config
        },
        function (error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function (response) {
          return response
        },
        function (error) {
          if (error.response.status === 403) {
            if (
              error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature'
            ) {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert('Sorry your token is wrong, and you cant proceed')
            } else if (error.response.data.msg === 'jwt expired') {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert('Sorry, your token session is expired')
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    setUser(state) {
      return state.user
    },
    getUsers(state) {
      return state.users
    },
    getRowses(state) {
      return state.totallRows
    },
    getPerPages(state) {
      return state.perPages
    },
    getPagess(state) {
      return state.pagess
    }
  }
}
