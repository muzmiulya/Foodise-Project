<template>
  <div class="home">
    <b-container fluid>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
        integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
        crossorigin="anonymous"
      />
      <b-row>
        <b-col class="firstColumn" xl="8" lg="8" md="8" sm="12" cols="12">
          <b-row>
            <b-col class="homeButton" xl lg md sm cols="3">
              <img alt="Vue home" src="../assets/1.png" />
            </b-col>
            <b-col class="foodItems" xl="9" lg="8" md="8" sm="8" cols="6">
              <div>
                <h2 v-show="!isSearch">Foodsie</h2>
                <b-container v-show="isSearch">
                  <b-row>
                    <form></form>
                    <b-col xl="12">
                      <b-form-input
                        type="search"
                        v-model="search"
                        v-show="isSearch"
                        placeholder="Search Product"
                        v-on:change="handleSearch"
                        class="searchProduct"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                </b-container>
              </div>
            </b-col>
            <b-col class="searchButton" xl lg="2" md="2" sm="2" cols="3">
              <b-button class="buttonSearch" type="reset" @click="isSearch = !isSearch">
                <img alt="Vue search" src="../assets/2.png" />
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="myCart" xl="4" lg="4" md="4" sm="12">
          Cart
          <span class="badge badge-pill badge-primary">
            {{
            incrementCount
            }}
          </span>
        </b-col>
      </b-row>
      <b-row>
        <Navbar :adds="addProduct"></Navbar>
        <b-col class="gridbackground" md="7">
          <div class="main">
            <b-row>
              <b-container class="sortLimit">
                <b-col xl="4" lg="4" md="6" sm="6" class="my-1">
                  <b-form-group
                    label="Sort"
                    label-cols-sm="4"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="sortBySelect"
                    class="mb-0"
                  >
                    <b-form-select v-model="sort" id="sortBySelect" size="sm" @change="handleSort">
                      <b-form-select-option value>-- none --</b-form-select-option>
                      <b-form-select-option-group label="Product Name">
                        <b-form-select-option value="product_name">Name (A-Z)</b-form-select-option>
                        <b-form-select-option value="product_name DESC">Name (Z-A)</b-form-select-option>
                      </b-form-select-option-group>
                      <b-form-select-option-group label="Category">
                        <option value="category_id">Food</option>
                        <option value="category_id DESC">Drink</option>
                      </b-form-select-option-group>
                      <b-form-select-option-group label="Price">
                        <option value="product_price">Low to High</option>
                        <option value="product_price DESC">High to Low</option>
                      </b-form-select-option-group>
                      <b-form-select-option-group label="Created">
                        <option value="product_created_at">Oldest</option>
                        <option value="product_created_at DESC">Newest</option>
                      </b-form-select-option-group>
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </b-container>
            </b-row>
            <hr />
            <b-row>
              <b-container class="product-list">
                <b-modal
                  id="modal-update"
                  class="modalAdd"
                  title="Update Item"
                  hide-footer
                  no-close-on-backdrop
                >
                  <b-container>
                    <b-alert v-bind:show="alert">{{ isMsg }}</b-alert>
                    <form class="formAdd" v-on:submit.prevent="patchProduct">
                      <b-form-input
                        type="text"
                        v-model="form.product_name"
                        placeholder="Poduct Name"
                      ></b-form-input>
                      <br />
                      <b-form-input
                        type="number"
                        v-model="form.product_price"
                        placeholder="Poduct Price"
                      ></b-form-input>
                      <br />
                      <b-form-input
                        type="text"
                        v-model="form.product_picture"
                        placeholder="Poduct Picture"
                      ></b-form-input>
                      <br />
                      <b-form-select v-model="form.product_status" size="sm">
                        <option disabled value selected>Product Status</option>
                        <option value="1">Active</option>
                        <option value="0">Not-Active</option>
                      </b-form-select>
                      <b-form-select v-model="form.category_id" size="sm">
                        <option disabled value selected>Category</option>
                        <option value="1">Food</option>
                        <option value="2">Drink</option>
                      </b-form-select>
                      <b-button :disabled="isDisabled" type="submit" @click="patchProduct()">Update</b-button>
                    </form>
                  </b-container>
                </b-modal>
                <b-row>
                  <b-col
                    class="cards"
                    xl="4"
                    lg="4"
                    md="6"
                    sm="6"
                    cols="6"
                    v-for="(item, index) in products"
                    :key="index"
                  >
                    <b-card
                      v-bind:img-src="require('../assets/7.jpg')"
                      img-alt="Image"
                      img-top
                      tag="article"
                      class="mb-2"
                      no-body
                      style="background-color:transparent; border: none; position: relative;"
                    >
                      <b-card-body style="padding:0;">
                        <div v-if="checkCart(item)" class="select-image">
                          <img class="icon-select" alt="Vue tick" src="../assets/tick2.png" />
                        </div>
                        <b-card-title
                          class="cardTitlePrice"
                          style="margin-bottom: 0"
                        >{{ item.product_name }}</b-card-title>
                        <b-card-text class="cardTitlePrice">
                          {{
                          item.product_price
                          }}
                        </b-card-text>
                        <b-button
                          pill
                          v-show="isHiding(item)"
                          variant="primary"
                          @click="addToCart(item), isHiding(item)"
                          style="width:33%"
                        >
                          <i class="fas fa-cart-plus"></i>
                        </b-button>
                        <b-button
                          pill
                          v-show="!isHiding(item)"
                          variant="danger"
                          style="width:33%"
                          @click="deleteEvent(item), !isHiding(item)"
                        >
                          <span aria-hidden="true">&times;</span>
                        </b-button>
                        <b-button
                          pill
                          v-show="isHiding(item)"
                          variant="success"
                          style="width:33%"
                          v-b-modal.modal-update
                          @click="setProduct(item)"
                        >
                          <i class="fas fa-edit"></i>
                        </b-button>
                        <b-button
                          pill
                          v-show="isHiding(item)"
                          variant="danger"
                          @click="deleteProduct(item)"
                          style="width:33%"
                        >
                          <i class="far fa-trash-alt"></i>
                        </b-button>
                      </b-card-body>
                    </b-card>
                  </b-col>
                </b-row>
              </b-container>
            </b-row>
            <hr />
            <b-row>
              <b-col xl="12" class="paginations">
                <div class="d-flex justify-content-center">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="limit"
                    @change="handlePageChange"
                    aria-controls="my-table"
                  ></b-pagination>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col class="yourcart" md="4">
          <div class="theGrid" v-if="cart.length > 0">
            <div class="gridbox1">
              <div class="orderboxes" v-for="(item, index) in cart" :key="index">
                <div class="item-a">
                  <img alt="Vue pictures" src="../assets/7.jpg" />
                </div>
                <div class="item-b">
                  <p>{{ item.product_name }}</p>
                </div>
                <div class="item-c">
                  <div class="item-cPrice">
                    <p>{{ item.product_price * item.purchase_qty }}</p>
                  </div>
                </div>
                <div class="item-d">
                  <b-button
                    type="button"
                    :disabled="item.purchase_qty === 1"
                    @click="decrementQty(item)"
                  >
                    <img alt="Vue pictures" src="../assets/minus.png" />
                  </b-button>
                </div>
                <div class="item-e">
                  <h5>{{ item.purchase_qty }}</h5>
                </div>
                <div class="item-f">
                  <b-button type="button" @click="incrementQty(item)">
                    <img alt="Vue pictures" src="../assets/plus.png" />
                  </b-button>
                </div>
              </div>
            </div>
            <div class="gridbox2">
              <div class="totalP">
                <div class="total">Total:</div>
                <div class="totalnumber">Rp. {{ computedSum }}</div>
              </div>
              <div class="ppn">*belum termasuk ppn</div>
              <div class="checkoutbutton">
                <b-button
                  block
                  type="button"
                  class="btn-primary"
                  v-b-modal.modal-checkout
                  @click="postOrder()"
                >Checkout</b-button>
                <b-modal
                  id="modal-checkout"
                  class="modalCheck"
                  title="Checkout"
                  hide-footer
                  no-close-on-backdrop
                >
                  <div class="Checkouts">
                    <div class="firstRow">
                      <div class="cashier">Cashier: Pevita Pearce</div>
                      <div class="cashier">Receipt no: #{{ histories.history_invoices }}</div>
                    </div>
                    <div class="secondRow">
                      <div class="loopProduct" v-for="(item, index) in cart" :key="index">
                        <div class="ordered">{{ item.product_name }} x{{ item.purchase_qty }}</div>
                        <div class="ordered">Rp. {{ item.product_price * item.purchase_qty }}</div>
                      </div>
                    </div>
                    <div class="secondHalfRow">
                      <div class="ppns">PPn 10%</div>
                      <div class="ppnPrice">Rp. {{ computedSum * 0.1 }}</div>
                    </div>
                    <div class="thirdRow">
                      <div class="subTotal">Total: Rp. {{ histories.history_subtotal }}</div>
                    </div>
                    <div class="fourthRow">
                      <div class="payment">Payment: Cash</div>
                    </div>
                    <div class="fifthRow">
                      <b-button class="buttonPrint" variant="success">Print</b-button>
                    </div>
                    <div class="sixthRow">
                      <h6>Or</h6>
                    </div>
                    <div class="seventhRow">
                      <b-button class="buttonSendEmail" variant="primary">Send Email</b-button>
                    </div>
                  </div>
                </b-modal>
              </div>
              <div class="cancelbutton">
                <b-button type="submit" class="btn-secondary" @click="deleteEventAll()">Cancel</b-button>
              </div>
            </div>
          </div>
          <div v-else>
            <b-container class="cartInside">
              <img alt="Vue cart" src="../assets/6.png" />
              <h3>Your cart is empty</h3>
              <p>Please add some items from the menu</p>
            </b-container>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/_base/Navbar'
export default {
  name: 'Home',
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 9,
      pageOptions: [3, 6, 9],
      sort: '',
      search: '',
      disabled: true,
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_picture: '',
        product_status: ''
      },
      forms: {},
      checkout: {},
      pages1: [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' }
      ],
      alert: false,
      isMsg: '',
      isUpdate: false,
      isSearch: false,
      isCheck: false,
      currentPage: 1,
      totalRows: null,
      product_id: '',
      products: [],
      histories: [],
      totalSum: []
    }
  },

  components: {
    Navbar
  },
  created() {
    this.get_product()
    this.search_product()
  },

  computed: {
    rows() {
      return this.totalRows
    },
    isDisabled() {
      return (
        this.form.product_name <= 0 ||
        this.form.product_price <= 0 ||
        this.form.product_picture <= 0 ||
        this.form.product_status <= 0 ||
        this.form.category_id <= 0
      )
    },
    computedSum() {
      const sums = this.cart.map((value) => {
        return value.purchase_qty * value.product_price
      })
      return sums.reduce((a, b) => a + b)
    },
    incrementCount() {
      return this.cart.length
    }
  },

  methods: {
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },

    isHiding(data) {
      if (this.cart.some((item) => item.product_id === data.product_id)) {
        return false
      } else {
        return true
      }
    },
    deleteEvent(data) {
      const indexProduct = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      const indexId = this.cart.indexOf(indexProduct)
      this.cart.splice(indexId, 1)
    },
    deleteEventAll() {
      this.cart.splice(0, this.cart.length)
    },
    handlePageChange(event) {
      this.$router.push(`?page=${event}`)
      this.page = event
      this.get_product()
    },
    handleSearch(event) {
      this.$router.push(`?keyword=${event}`)
      this.search = event
      this.search_product()
    },
    handleSort(event) {
      this.$router.push(`?sort=${event}`)
      this.sort = event
      this.get_product()
    },
    incrementQty(data) {
      const incrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      incrementData.purchase_qty += 1
    },
    decrementQty(data) {
      const decrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      decrementData.purchase_qty -= 1
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        purchase_qty: 1,
        product_name: data.product_name,
        product_price: data.product_price
      }
      this.cart = [...this.cart, setCart]
    },
    addProduct(data) {
      console.log(data)
      axios
        .post('http://127.0.0.1:3001/product', data)
        .then((response) => {
          this.alert = true
          this.isMsg = response.data.msg
          this.get_product()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    get_product(event) {
      axios
        .get(
          `http://127.0.0.1:3001/product?sort=${this.sort}&page=${this.page}&limit=${this.limit}`
        )
        .then((response) => {
          this.products = response.data.data
          this.totalRows = response.data.pagination.totalData
          // console.log(this.totalRows)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    search_product(event) {
      axios
        .get(
          `http://127.0.0.1:3001/product/search/name?search=${this.search}&limit=${this.limit}`
        )
        .then((response) => {
          this.products = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    setProduct(data) {
      this.form = {
        product_name: data.product_name,
        category_id: data.category_id,
        product_price: data.product_price,
        product_picture: data.product_picture,
        product_status: data.product_status
      }
      this.isUpdate = true
      this.product_id = data.product_id
    },
    patchProduct() {
      console.log(this.product_id)
      console.log(this.form)
      this.isUpdate = false
      axios
        .patch(`http://127.0.0.1:3001/product/${this.product_id}`, this.form)
        .then((response) => {
          this.get_product()
          this.alert = true
          this.isMsg = response.data.msg
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteProduct(data) {
      console.log(data.product_id)
      axios
        .delete(`http://127.0.0.1:3001/product/${data.product_id}`, this.form)
        .then((response) => {
          this.get_product()
          this.alert = true
          this.isMsg = response.data.msg
        })
        .catch((error) => {
          console.log(error)
        })
    },
    postOrder() {
      this.checkout = { orders: this.cart }
      axios
        .post('http://127.0.0.1:3001/purchase', this.checkout)
        .then((response) => {
          this.histories = response.data.data
          this.alert = true
          this.isMsg = response.data.msg
          console.log(this.histories)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style src="../assets/css/homeSelect.css"></style>
