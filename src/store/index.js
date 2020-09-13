import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Product from './modules/product'
import Category from './modules/category'
import Purchase from './modules/purchase'
import History from './modules/history'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Product,
    Category,
    Purchase,
    History
  },
  state: {
    name: 'Muhammad Muzmi Ulya'
  },
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})
