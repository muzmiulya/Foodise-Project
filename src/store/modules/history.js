import axios from 'axios'

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
        .get(`${process.env.VUE_APP_URL}/history/income/today`)
        .then(response => {
          context.commit('setIncomeToday', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getOrderCount(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/order/count`)
        .then(response => {
          context.commit('setOrderCount', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getIncomeYearly(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/income/year`)
        .then(response => {
          context.commit('setIncomeYearly', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getChartMonthly(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/history/chart/monthly?months=${context.state.month}`
        )
        .then(response => {
          context.commit('setChartMonthly', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistoryPerDay(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/history/days/days?date=${context.state.date}`
        )
        .then(response => {
          const totalRow = response.data.data.length
          context.commit('setHistoryPerDay', response.data.data)
          context.commit('setTotalRows', totalRow)
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
