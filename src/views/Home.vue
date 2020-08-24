<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col class="firstColumn" xl="8" lg="8" md="8" sm="12" xs="12">
          <b-row>
            <b-col class="homeButton" xl lg md sm>
              <img alt="Vue home" src="../assets/1.png" />
            </b-col>
            <b-col class="foodItems" xl="9" lg="9" md="9" sm="9">
              <div>
                <h2 v-show="!isSearch">Food Items</h2>
                <b-container v-show="isSearch">
                  <b-row>
                    <b-col xl="12">
                      <input
                        type="search"
                        v-model="search"
                        placeholder="Search Product"
                        v-on:change="search_product()"
                        class="searchProduct"
                      />
                    </b-col>
                  </b-row>
                </b-container>
              </div>
            </b-col>

            <b-col class="searchButton" xl lg md sm>
              <div>
                <b-button type="button" class="buttonSearch" @click="isSearch = !isSearch">
                  <img alt="Vue search" src="../assets/2.png" />
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="myCart" xl="4" lg="4" md="4" sm="12">
          Cart
          <span class="badge badge-pill badge-primary">{{ count }}</span>
        </b-col>
      </b-row>
      <b-row>
        <Navbar />
        <b-col class="gridbackground" md="7">
          <div class="main">
            <hr />
            <b-container>
              <b-row>
                <b-col xl="4">
                  <div>
                    <b-col cols="12" class="my-1">
                      <b-form-group
                        label="Sort"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="sortBySelect"
                        class="mb-0"
                      >
                        <b-input-group size="sm">
                          <b-form-select
                            v-model="sort"
                            id="sortBySelect"
                            class="w-75"
                            @change="get_product()"
                          >
                            <template v-slot:first>
                              <option value>-- none --</option>
                              <option value="product_name">Name</option>
                              <option value="category_id">Category</option>
                              <option value="product_price">Price</option>
                              <option value="product_updated_at DESC">New</option>
                            </template>
                          </b-form-select>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </div>
                </b-col>
              </b-row>
            </b-container>
            <hr />
            <b-container class="bv-example-row">
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
                    <input type="text" v-model="form.category_id" placeholder="Category Id" />
                    <br />
                    <input type="text" v-model="form.product_name" placeholder="Poduct Name" />
                    <br />
                    <input type="text" v-model="form.product_price" placeholder="Poduct Price" />
                    <br />
                    <input type="text" v-model="form.product_picture" placeholder="Poduct Picture" />
                    <br />
                    <input type="text" v-model="form.product_status" placeholder="Poduct Status" />
                    <br />
                    <button type="button" @click="patchProduct()">Update</button>
                  </form>
                </b-container>
              </b-modal>
              <b-row>
                <b-col cols="4" v-for="(item, index) in products" :key="index">
                  <b-card
                    v-bind:title="item.product_name"
                    v-bind:img-src="require('../assets/7.jpg')"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                    <b-card-text>{{ item.product_price }}</b-card-text>
                    <b-button
                      variant="primary"
                      @click="addToCart(item), incrementCount()"
                      style="width:100%"
                    >Add to Cart</b-button>
                    <b-button
                      variant="success"
                      style="width:100%"
                      v-b-modal.modal-update
                      @click="setProduct(item)"
                    >Update</b-button>
                    <b-button
                      variant="danger"
                      @click="deleteProduct(item)"
                      style="width:100%"
                    >Delete</b-button>
                  </b-card>
                </b-col>
              </b-row>
            </b-container>
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
                  <p>{{item.product_name}}</p>
                </div>
                <div class="item-c">
                  <div class="item-cPrice">
                    <p>{{item.product_price}}</p>
                  </div>
                </div>
                <div class="item-d">
                  <button type="button">
                    <img alt="Vue pictures" src="../assets/minus.png" @click="decrementQty(data)" />
                  </button>
                </div>
                <div class="item-e">
                  <h5>{{item.qty}}</h5>
                </div>
                <div class="item-f">
                  <button type="button">
                    <img alt="Vue pictures" src="../assets/plus.png" @click="incrementQty(data)" />
                  </button>
                </div>
              </div>
            </div>
            <div class="gridbox2">
              <div class="totalP">
                <div class="total">Total:</div>
                <div class="totalnumber">Rp. 150.000</div>
              </div>
              <div class="ppn">*belum termasuk ppn</div>
              <div class="checkoutbutton">
                <button
                  block
                  type="button"
                  class="btn-primary"
                  data-toggle="modal"
                  data-target="#modalcheckout"
                >Checkout</button>
              </div>
              <div class="cancelbutton">
                <button type="button" class="btn-secondary">Cancel</button>
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
// import Aside from '../components/_base/Aside'
export default {
  name: 'Home',
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 9,
      sort: '',
      search: null,
      pageOptions: [3, 6, 9],
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_picture: '',
        product_status: ''
      },
      alert: false,
      isMsg: '',
      isUpdate: false,
      isSearch: false,
      product_id: '',
      products: []
    }
  },

  components: {
    Navbar
    // Aside
  },
  created() {
    this.get_product()
  },
  watch: {
    search: function () {
      console.log(this.search)
    },
    count: function () {
      console.log(this.count)
    },
    cart: function () {
      console.log(this.cart)
    }
  },
  methods: {
    incrementCount() {
      this.count += 1
    },
    incrementQty(data) {
      data.qty += 1
    },
    decrementQty(data) {
      data.qty -= 1
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        qty: 1,
        product_name: data.product_name,
        product_price: data.product_price
      }
      this.cart = [...this.cart, setCart]
      console.log(this.cart)
    },
    get_product() {
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
    search_product() {
      axios
        .get(
          `http://127.0.0.1:3001/product/search/name?search=${this.search}&limit=${this.limit}`
        )
        .then((response) => {
          this.products = response.data.data
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
    }
  }
}
</script>

<style src="../assets/css/homeSelect.css"></style>
