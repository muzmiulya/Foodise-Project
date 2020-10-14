<template>
  <div class="home">
    <b-container fluid>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
        integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
        crossorigin="anonymous"
      />
      <Header :increments="incrementCount"></Header>
      <b-row>
        <Navbar></Navbar>
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
                      v-model="defaultSort"
                      id="sortBySelect"
                      size="sm"
                      @change="handleSort"
                    >
                      <b-form-select-option value
                        >-- none --</b-form-select-option
                      >
                      <b-form-select-option-group label="Product Name">
                        <b-form-select-option value="product_name"
                          >Name (A-Z)</b-form-select-option
                        >
                        <b-form-select-option value="product_name DESC"
                          >Name (Z-A)</b-form-select-option
                        >
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
                  @close="alertClose()"
                >
                  <b-container>
                    <b-alert variant="success" v-bind:show="alert">{{
                      isMsg
                    }}</b-alert>
                    <b-alert variant="danger" v-bind:show="alertError">{{
                      isMsgError
                    }}</b-alert>
                    <form class="formAdd">
                      <b-form-input
                        type="text"
                        v-model="form.product_name"
                        placeholder="Poduct Name"
                        required
                      ></b-form-input>
                      <br />
                      <b-form-input
                        type="number"
                        v-model="form.product_price"
                        placeholder="Poduct Price"
                        required
                      ></b-form-input>
                      <br />
                      <b-form-file
                        id="inputPi"
                        type="file"
                        @change="handleFile"
                        placeholder="Choose a file..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                      <p>(max file size: 1 mb)</p>
                      <b-form-select
                        v-model="form.product_status"
                        size="sm"
                        required
                      >
                        <option disabled value selected>Product Status</option>
                        <option value="1">Active</option>
                        <option value="0">Not-Active</option>
                      </b-form-select>
                      <b-form-select
                        v-model="form.category_id"
                        :options="category"
                        size="sm"
                        required
                      ></b-form-select>
                      <b-button :disabled="isDisabled" @click="patchProduct()"
                        >Update</b-button
                      >
                    </form>
                  </b-container>
                </b-modal>
                <b-modal
                  id="modal-delete"
                  hide-header
                  hide-footer
                  no-close-on-backdrop
                  no-close-on-esc
                >
                  <b-container class="modaldelete">
                    <div class="youSure">
                      <h3>Are You Sure?</h3>
                    </div>
                    <br />
                    <b-button
                      class="buttonCancelDel"
                      pill
                      variant="warning"
                      @click="$bvModal.hide('modal-delete')"
                      >Cancel</b-button
                    >
                    <b-button
                      class="buttonYesDel"
                      pill
                      variant="danger"
                      @click="deleteProduct(), $bvModal.hide('modal-delete')"
                      >Yes</b-button
                    >
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
                      img-alt="Image"
                      img-top
                      tag="article"
                      class="mb-2"
                      no-body
                      style="
                        background-color: transparent;
                        border: none;
                        position: relative;
                      "
                    >
                      <b-card-body style="padding: 0">
                        <div class="productImage">
                          <b-img
                            rounded="top"
                            class="images"
                            :src="urlApi + item.product_picture"
                            alt="Fluid image"
                            fluid
                          />
                        </div>

                        <div v-if="checkCart(item)" class="select-image">
                          <img
                            class="icon-select"
                            alt="Vue tick"
                            src="../assets/tick2.png"
                          />
                        </div>
                        <b-card-title
                          class="cardTitlePrice"
                          style="margin-bottom: 0"
                          >{{ item.product_name }}</b-card-title
                        >
                        <b-card-text class="cardTitlePrice">{{
                          item.product_price
                        }}</b-card-text>
                        <b-button
                          v-show="isHiding(item)"
                          variant="primary"
                          @click="addToCarts(item), isHiding(item)"
                          style="width: 100%"
                        >
                          <i class="fas fa-cart-plus"></i>
                        </b-button>
                        <b-button
                          v-show="!isHiding(item)"
                          variant="danger"
                          style="width: 100%"
                          @click="deleteEvent(item), !isHiding(item)"
                        >
                          <span aria-hidden="true">&times;</span>
                        </b-button>
                        <div class="flexs">
                          <b-button
                            v-show="isHiding(item)"
                            v-if="user.user_role === 1"
                            variant="success"
                            style="width: 45%"
                            v-b-modal.modal-update
                            @click="setProduct(item)"
                          >
                            <i class="fas fa-edit"></i>
                          </b-button>
                          <b-button
                            v-show="isHiding(item)"
                            v-if="user.user_role === 1"
                            variant="danger"
                            style="width: 45%"
                            v-b-modal.modal-delete
                            @click="setDelete(item)"
                          >
                            <i class="far fa-trash-alt"></i>
                          </b-button>
                        </div>
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
        <Aside></Aside>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from '../components/_base/Header'
import Navbar from '../components/_base/Navbar'
import Aside from '../components/_base/Aside'
import disabledMixin from '../mixins/disabledMixin'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      urlApi: process.env.VUE_APP_URL + '/',
      currentPage: 1,
      defaultSort: '',
      disabled: true,
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_picture: {},
        product_status: ''
      },
      pages1: [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' }
      ],
      alert: false,
      isMsg: '',
      alertError: false,
      isMsgError: '',
      alertDel: false,
      isMsgDel: '',
      isUpdate: false,
      isCheck: false
    }
  },

  components: {
    Header,
    Navbar,
    Aside
  },
  created() {
    this.getProducts()
    this.getCategory()
  },
  computed: {
    ...mapGetters({
      limit: 'getLimit',
      page: 'getPage',
      sort: 'getSort',
      rows: 'getTotalRows',
      search: 'getSearch',
      products: 'getProduct',
      category: 'getCategoryValue',
      cart: 'getCart',
      user: 'setUser'
    }),
    incrementCount() {
      return this.cart.length
    }
  },
  mixins: [disabledMixin],
  methods: {
    ...mapActions([
      'getProducts',
      'getCategory',
      'updateProducts',
      'deleteProducts',
      'searchProduct'
    ]),
    ...mapMutations(['setPage', 'setSort', 'setSearch', 'addToCarts']),
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    alertClose() {
      this.alert = false
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
    handleFile(event) {
      this.form.product_picture = event.target.files[0]
    },
    handlePageChange(event) {
      this.$router.push(`?page=${event}`)
      this.setPage(event)
      this.getProducts()
    },
    handleSort(event) {
      this.$router.push(`?sort=${event}`)
      this.setSort(event)
      this.getProducts()
    },
    setProduct(data) {
      this.form = {
        product_name: data.product_name,
        category_id: data.category_id,
        product_price: data.product_price,
        product_picture: data.product_picture,
        product_status: data.product_status
      }
      this.product_id = data.product_id
    },
    setDelete(data) {
      this.form = {
        product_name: data.product_name,
        category_id: data.category_id,
        product_price: data.product_price,
        product_picture: data.product_picture,
        product_status: data.product_status
      }
      this.product_id = data.product_id
    },
    patchProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_picture', this.form.product_picture)
      data.append('product_status', this.form.product_status)
      const setData = {
        product_id: this.product_id,
        form: data
      }
      this.isUpdate = false
      this.updateProducts(setData)
        .then((response) => {
          this.alert = true
          this.isMsg = response.msg
          this.alertError = false
          this.getProducts()
        })
        .catch((error) => {
          this.alertError = true
          this.isMsgError = error.data.msg
          this.alert = false
        })
    },
    deleteProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_picture', this.form.product_picture)
      data.append('product_status', this.form.product_status)
      const setData = {
        product_id: this.product_id,
        form: data
      }
      this.isUpdate = false
      this.deleteProducts(setData)
        .then((response) => {
          this.alertDel = true
          this.isMsgDel = response.msg
          this.getProducts()
        })
        .catch((error) => {
          this.alertDel = true
          this.isMsgDel = error.data.msg
        })
    }
  }
}
</script>

<style src="../assets/css/homeSelect.css"></style>
