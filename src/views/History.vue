<template>
  <div class="history">
    <b-container fluid>
      <b-row>
        <b-col class="firstColumn" lg="12" md="12" sm="12" cols="12">
          <b-row>
            <b-col class="homeButton" lg md sm cols="2">
              <img alt="Vue home" src="../assets/1.png" />
            </b-col>
            <b-col class="history-header" lg="11" md="11" sm="11" cols="10">
              <h2>History</h2>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <Navbar />
        <b-col class="historyBg" lg md sm xs>
          <b-container class="grid-container">
            <b-col class="box1">
              <div class="incomeorder">Today's Income</div>
              <div class="numberamount">Rp. {{ todayIncome.income }}</div>
              <div class="percentage">+2% Yesterday</div>
            </b-col>
            <b-col class="box2">
              <div class="incomeorder">Orders</div>
              <div class="numberamount">{{ orderCount.orders }}</div>
              <div class="percentage">+5% Last Week</div>
            </b-col>
            <b-col class="box3">
              <div class="incomeorder">This Year's Income</div>
              <div class="numberamount">Rp. {{yearlyIncome.yearly}}</div>
              <div class="percentage">+10% Last Year</div>
            </b-col>
            <b-col class="box4">
              <div class="revenue">Revenue</div>
              <div class="month">
                <b-form>
                  <select name="months" id="months">
                    <option value="thismonth">Month</option>
                    <option value="lastmonth">Last</option>
                  </select>
                </b-form>
              </div>
              <div class="chart">
                <line-chart
                  class="line-chart"
                  width="auto"
                  height="300px"
                  legend="bottom"
                  label="This Month"
                  :data="datas"
                ></line-chart>
              </div>
            </b-col>
            <b-col class="box5">
              <div class="recent">Recent Order</div>
              <div class="today">
                <b-form>
                  <select name="day" id="days">
                    <option value="Today">Today</option>
                    <option value="Yesterday">Yesterday</option>
                  </select>
                </b-form>
              </div>
              <div class="tables">
                <b-table
                  class="tableOrder"
                  v-model="perDay"
                  striped
                  hover
                  :items="perDay"
                  :fields="fields"
                ></b-table>
              </div>
            </b-col>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/_base/Navbar'
export default {
  name: 'History',
  data() {
    return {
      date: 'date',
      interval: 0,
      fields: [
        { key: 'history_invoices', label: 'INVOICES' },
        { key: 'cashier', label: 'CASHIER' },
        { key: 'history_created_at', label: 'DATE' },
        { key: 'orders', label: 'ORDERS' },
        { key: 'history_subtotal', label: 'AMOUNT' }
      ],
      items: [],
      // datas: [
      //   {
      //     name: 'This Month',
      //     data: {
      //       1: 0,
      //       2: 20000,
      //       3: 11000,
      //       4: 28000,
      //       5: 21000,
      //       6: 39000,
      //       7: 12000,
      //       8: 47000,
      //       9: 40000,
      //       10: 33000,
      //       11: 37000,
      //       12: 24000,
      //       13: 46000,
      //       14: 35000,
      //       15: 39000,
      //       16: 32000,
      //       17: 23000,
      //       18: 39000,
      //       19: 30000,
      //       20: 40000,
      //       21: 32000,
      //       22: 12000,
      //       23: 24000,
      //       24: 46000,
      //       25: 44000,
      //       26: 56000,
      //       27: 31000,
      //       28: 47000,
      //       29: 43000,
      //       30: 39000
      //     }
      //   },
      //   {
      //     name: 'Last Month',
      //     data: {
      //       1: 10000,
      //       2: 29000,
      //       3: 3000,
      //       4: 37000,
      //       5: 22000,
      //       6: 38000,
      //       7: 12000,
      //       8: 29000,
      //       9: 22000,
      //       10: 46000,
      //       11: 13000,
      //       12: 18000,
      //       13: 12000,
      //       14: 30000,
      //       15: 21000,
      //       16: 32000,
      //       17: 45000,
      //       18: 43000,
      //       19: 37000,
      //       20: 41000,
      //       21: 29000,
      //       22: 31000,
      //       23: 39000,
      //       24: 28000,
      //       25: 17000,
      //       26: 36000,
      //       27: 17000,
      //       28: 32000,
      //       29: 28000,
      //       30: 21000
      //     }
      //   }
      // ],

      datas: {},
      forms: {
        history_invoices: '',
        history_created_at: '',
        history_subtotal: ''
      },
      history_id: '',
      todayIncome: [],
      orderCount: [],
      perDay: [],
      yearlyIncome: []
    }
  },

  components: {
    Navbar
  },
  // watch: {
  //   perDay: function () {
  //     console.log(this.perDay)
  //   }
  // },

  created() {
    this.getIncomeToday()
    this.getOrderCount()
    this.getHistoryPerDay()
    this.getIncomeYearly()
    this.getChartMonthly()
  },

  methods: {
    getHistoryPerDay() {
      axios
        .get('http://127.0.0.1:3001/history/days/days')
        .then((response) => {
          this.perDay.push(response.data.data)
          // console.log(this.perDay)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getIncomeToday() {
      axios
        .get('http://127.0.0.1:3001/history/income/today')
        .then((response) => {
          this.todayIncome = response.data.data[0]
          // console.log(this.todayIncome)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getOrderCount() {
      axios
        .get('http://127.0.0.1:3001/history/order/count')
        .then((response) => {
          this.orderCount = response.data.data[0]
          // console.log(this.orderCount)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getIncomeYearly() {
      axios
        .get('http://127.0.0.1:3001/history/income/year')
        .then((response) => {
          this.yearlyIncome = response.data.data[0]
          // console.log(this.todayIncome)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getChartMonthly() {
      axios
        .get('http://127.0.0.1:3001/history/chart/monthly')
        .then((response) => {
          this.datas = response.data.data
          console.log(this.datas)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style src="../assets/css/history.css"></style>
