<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col class="firstColumn" xl="8" lg="8" md="8" sm="12" cols="12">
          <b-row>
            <b-col class="homeButton" xl lg md sm cols="3">
              <img alt="Vue home" src="../assets/1.png" />
            </b-col>
            <b-col class="foodItems" xl="9" lg="8" md="8" sm="8" cols="6">
              <div>
                <h2 v-show="!isSearch">Food Items</h2>
                <b-container v-show="isSearch">
                  <b-row>
                    <form></form>
                    <b-col xl="12">
                      <b-form-input
                        type="search"
                        v-model="search"
                        v-show="isSearch"
                        placeholder="Search Product"
                        v-on:change="search_product()"
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
        <Navbar />
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
                    <b-form-select
                      v-model="sort"
                      id="sortBySelect"
                      size="sm"
                      @change="get_product()"
                    >
                      <option value>-- none --</option>
                      <option value="product_name">Name</option>
                      <option value="category_id">Category</option>
                      <option value="product_price">Price</option>
                      <option value="product_updated_at DESC">New</option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col xl="4" lg="4" md="6" sm="6" class="my-1">
                  <b-form-group
                    label="Limit"
                    label-cols-sm="4"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="perPageSelect"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="limit"
                      id="perPageSelect"
                      size="sm"
                      @change="get_product(), handleSort"
                    >
                      <option value>none</option>
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="9">9</option>
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
                    <form class="formAdd" v-on:submit.prevent="addProduct">
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
                      <b-form-input
                        type="number"
                        v-model="form.product_status"
                        placeholder="Poduct Status"
                      ></b-form-input>
                      <br />
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
                          v-show="isHiding(item)"
                          variant="primary"
                          @click="addToCart(item), isHiding(item)"
                          style="width:33%"
                        >
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-cart-plus"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8.5 5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M8 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0v-2z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                            />
                          </svg>
                        </b-button>
                        <b-button
                          v-show="!isHiding(item)"
                          variant="danger"
                          style="width:33%"
                          @click="deleteEvent(item), !isHiding(item)"
                        >
                          <span aria-hidden="true">&times;</span>
                        </b-button>
                        <b-button
                          v-show="isHiding(item)"
                          variant="success"
                          style="width:33%"
                          v-b-modal.modal-update
                          @click="setProduct(item)"
                        >
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-patch-plus"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M8 5.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M7.5 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8z"
                            />
                          </svg>
                        </b-button>
                        <b-button
                          v-show="isHiding(item)"
                          variant="danger"
                          @click="deleteProduct(item)"
                          style="width:33%"
                        >
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-trash"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
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
                  <b-pagination-nav
                    class="pagination-nav"
                    v-model="page"
                    :pages="pages1"
                    @change="handlePageChange"
                  ></b-pagination-nav>
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
      sort: '',
      totalRows: 1,
      search: '',
      disabled: true,
      pageOptions: [3, 6, 9],
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_picture: '',
        product_status: ''
      },
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
  updated() {
    console.log(this.$route.query)
  },
  watch: {
    totalSum: function () {
      console.log(this.totalSum)
    }
  },
  computed: {
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
    // handleSearch(event) {
    //   this.$router.push(`?search=${event}`)
    //   this.search = event
    //   this.search_product()
    // },
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
    get_product(event) {
      axios
        .get(
          `http://127.0.0.1:3001/product?sort=${this.sort}&page=${this.page}&limit=${this.limit}`
        )
        .then((response) => {
          this.products = response.data.data
          console.log(this.products)
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
          // this.$router.push(`?search=${event}`)
          console.log(this.products)
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
          console.log(response)
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
          console.log(response)
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
