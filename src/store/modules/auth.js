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
          .post('http://127.0.0.1:3001/users/login', payload)
          .then(response => {
            console.log(response.data.data)
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
          .post('http://127.0.0.1:3001/users/register', payload)
          .then(response => {
            // console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            // console.log(error)
          })
      })
    },
    getAllUser(context, payload) {
      axios
        .get('http://127.0.0.1:3001/users/user')
        .then(response => {
          context.commit('setAllUser', response.data.data)
          const totallRows = response.data.data.length
          context.commit('setTotallRows', totallRows)
          // this.users = response.data.data
          // this.totalRows = response.data.data.length
          // this.getIncomeToday()
          // console.log(this.todayIncome)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3001/users/patch/${payload.user_id}`,
            payload.form
          )
          .then(response => {
            console.log(response)
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
          .delete(`http://127.0.0.1:3001/users/delete/${payload}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    interceptorRequest(context) {
      console.log('interceptor Works !')
      axios.interceptors.request.use(
        function(config) {
          config.headers.authorization = `Bearer ${context.state.token}`
          // Do something before request is sent
          return config
        },
        function(error) {
          // Do something with request error
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          console.log(error.response)
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
