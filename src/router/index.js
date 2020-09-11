import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Axios from '../views/Axios.vue'
import Lifecycle from '../views/Lifecycle.vue'
import Homeselect from '../views/Homeselect.vue'
import History from '../views/History.vue'
import Login from '../views/auth/Login.vue'
import store from '../store/index'
import Product from '../views/main/Product.vue'
import User from '../views/auth/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/axios',
    name: 'Axios',
    component: Axios,
    meta: { requiresAuth: true }
  },
  {
    path: '/lifecycle',
    name: 'Lifecycle',
    component: Lifecycle,
    meta: { requiresAuth: true }
  },
  {
    path: '/homeSelect',
    name: 'Homeselect',
    component: Homeselect,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/product',
    name: 'Produt',
    component: Product,
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export default router
