import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Product from './modules/product'
import Category from './modules/category'
import Purchase from './modules/purchase'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Product,
    Category,
    Purchase
  },
  state: {
    name: 'Muhammad Muzmi Ulya'
  },
  mutations: {},
  actions: {},
  getters: {}
})
