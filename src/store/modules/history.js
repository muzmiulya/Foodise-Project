import axios from 'axios'
// import { changeUser } from '../../../../../BACKEND/src/config/mysql'

export default {
  state: {
    todayIncome: [],
    orderCount: [],
    yearlyIncome: [],
    month: 'MONTH(NOW())',
    datas: {},
    date: 'date',
    perDay: [],
    pages: 1,
    totalRow: null,
    perPage: 5
  },
  mutations: {
    setIncomeToday(state, payload) {
      state.todayIncome = payload
    },
    setOrderCount(state, payload) {
      state.orderCount = payload
    },
    setIncomeYearly(state, payload) {
      state.yearlyIncome = payload
    },
    setMonth(state, payload) {
      state.month = payload
    },
    setChartMonthly(state, payload) {
      state.datas = payload
    },
    setDate(state, payload) {
      state.date = payload
    },
    setHistoryPerDay(state, payload) {
      state.perDay = payload
    },
    setPages(state, payload) {
      state.pages = payload
    },
    setTotalRows(state, payload) {
      state.totalRow = payload
    }
  },
  actions: {
    getIncomeToday(context, payload) {
      axios
        .get('http://127.0.0.1:3001/history/income/today')
        .then(response => {
          context.commit('setIncomeToday', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getOrderCount(context, payload) {
      axios
        .get('http://127.0.0.1:3001/history/order/count')
        .then(response => {
          context.commit('setOrderCount', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getIncomeYearly(context, payload) {
      axios
        .get('http://127.0.0.1:3001/history/income/year')
        .then(response => {
          context.commit('setIncomeYearly', response.data.data)
          // this.yearlyIncome = response.data.data
          // this.getIncomeYearly()
          // console.log(this.yearlyIncome)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getChartMonthly(context, payload) {
      axios
        .get(
          `http://127.0.0.1:3001/history/chart/monthly?months=${context.state.month}`
        )
        .then(response => {
          // this.datas = response.data.data
          context.commit('setChartMonthly', response.data.data)
          // this.getChartMonthly()
          // console.log(this.datas)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistoryPerDay(context, payload) {
      axios
        .get(
          `http://127.0.0.1:3001/history/days/days?date=${context.state.date}`
        )
        .then(response => {
          console.log(response.data.data)
          const datas = response.data.data.map(value => {
            const setData = {
              cashier: context.rootState.Auth.user.user_name,
              ...value
            }
            return setData
          })
          // const data = response.data.data.push
          const totalRow = datas.length

          // this.perDay = datas
          context.commit('setHistoryPerDay', datas)
          context.commit('setTotalRows', totalRow)
          // this.totalRows = response.data.data.length
          // console.log(this.perDay)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    getIncome(state) {
      return state.todayIncome
    },
    getCount(state) {
      return state.orderCount
    },
    getYearly(state) {
      return state.yearlyIncome
    },
    getMonthly(state) {
      return state.month
    },
    getDatas(state) {
      return state.datas
    },
    getDate(state) {
      return state.date
    },
    getPerDay(state) {
      return state.perDay
    },
    getPages(state) {
      return state.pages
    },
    getRows(state) {
      return state.totalRow
    },
    getPerPage(state) {
      return state.perPage
    }
  }
}
