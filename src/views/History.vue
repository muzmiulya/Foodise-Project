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
              <div class="numberamount">Rp. {{ todayIncome.incomes }}</div>
              <div class="percentage">
                {{ todayIncome.incomeYesterday }} Yesterday
              </div>
            </b-col>
            <b-col class="box2">
              <div class="incomeorder">Orders</div>
              <div class="numberamount">{{ orderCount.countThisWeek }}</div>
              <div class="percentage">
                {{ orderCount.countLastWeek }} Last Week
              </div>
            </b-col>
            <b-col class="box3">
              <div class="incomeorder">This Year's Income</div>
              <div class="numberamount">
                Rp. {{ yearlyIncome.countThisYear }}
              </div>
              <div class="percentage">
                {{ yearlyIncome.countLastYear }} Last Year
              </div>
            </b-col>
            <b-col class="box4">
              <div class="revenue">Revenue</div>
              <div class="month">
                <b-form>
                  <b-form-select
                    v-model="months"
                    text="Month"
                    :options="monthoptions"
                    @change="handleChart"
                  ></b-form-select>
                </b-form>
              </div>
              <div class="chart">
                <line-chart
                  class="line-chart"
                  width="auto"
                  height="300px"
                  legend="bottom"
                  :data="datas"
                  label="This Month"
                ></line-chart>
              </div>
            </b-col>
            <b-col class="box5">
              <div class="recent">Recent Order</div>
              <div class="today">
                <div>
                  <b-form-select
                    v-model="dateNow"
                    text="Date"
                    :options="options"
                    @change="handleTable"
                  ></b-form-select>
                </div>
              </div>
              <b-container class="tables">
                <b-table
                  class="tableOrder"
                  striped
                  hover
                  :items="perDay"
                  :fields="fields"
                  :per-page="perPage"
                  :current-page="currentPage"
                ></b-table>
                <div class="paginations">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rowes"
                    :per-page="perPage"
                    size="md"
                    class="my-0"
                    @change="handlePageChange"
                  ></b-pagination>
                </div>
              </b-container>
            </b-col>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/_base/Navbar'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'History',
  data() {
    return {
      dateNow: 'date',
      interval: 0,
      fields: [
        { key: 'history_invoices', label: 'INVOICES' },
        { key: 'cashier', label: 'CASHIER' },
        { key: 'history_created_at', label: 'DATE' },
        { key: 'orders', label: 'ORDERS' },
        { key: 'history_subtotal', label: 'AMOUNT' }
      ],
      items: [],
      months: 'MONTH(NOW())',
      options: [
        { value: 'date', text: 'Today' },
        { value: 'week', text: 'This Week' },
        { value: 'month', text: 'This Month' }
      ],
      monthoptions: [
        { value: 'MONTH(NOW())', text: 'This Month' },
        { value: '1', text: 'January' },
        { value: '2', text: 'February' },
        { value: '3', text: 'March' },
        { value: '4', text: 'April' },
        { value: '5', text: 'May' },
        { value: '6', text: 'June' },
        { value: '7', text: 'July' },
        { value: '8', text: 'August' },
        { value: '9', text: 'September' },
        { value: '10', text: 'October' },
        { value: '11', text: 'November' },
        { value: '12', text: 'December' }
      ],
      currentPage: 1
    }
  },

  components: {
    Navbar
  },
  computed: {
    ...mapGetters({
      todayIncome: 'getIncome',
      orderCount: 'getCount',
      yearlyIncome: 'getYearly',
      month: 'getMonthly',
      datas: 'getDatas',
      date: 'getDate',
      perDay: 'getPerDay',
      totalRow: 'getRows',
      perPage: 'getPerPage'
    }),
    rowes() {
      return this.totalRow
    }
  },
  created() {
    this.getIncomeToday()
    this.getOrderCount()
    this.getHistoryPerDay()
    this.getIncomeYearly()
    this.getChartMonthly()
  },

  methods: {
    ...mapActions([
      'getIncomeToday',
      'getOrderCount',
      'getIncomeYearly',
      'getChartMonthly',
      'getHistoryPerDay'
    ]),
    ...mapMutations(['setMonth', 'setDate', 'setPages']),
    handlePageChange(event) {
      this.setPages(event)
      this.getHistoryPerDay()
    },
    handleTable(event) {
      this.setDate(event)
      this.getHistoryPerDay()
    },
    handleChart(event) {
      this.setMonth(event)
      this.getChartMonthly()
    }
  }
}
</script>

<style src="../assets/css/history.css"></style>
