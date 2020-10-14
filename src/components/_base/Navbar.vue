<template>
  <b-col class="sideHome" xl="1" lg="1" md="1">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
      integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
      crossorigin="anonymous"
    />
    <b-row>
      <b-col class="forkSpoon homeSide" xl="12">
        <router-link to="/" vslot="{ route, navigate}">
          <b-button v-b-tooltip.hover.top="'Home'" class="forkSpoonButton">
            <img alt="Vue forkSpoon" src="../../assets/3.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="history homeSide" xl="12">
        <router-link to="/history" vslot="{ route, navigate}">
          <b-button v-b-tooltip.hover.top="'History'" class="historyButton">
            <img alt="Vue history" src="../../assets/4.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="add homeSide" xl="12">
        <div>
          <b-button
            v-if="user.user_role === 1"
            v-b-tooltip.hover.top="'Add Product'"
            class="addButton"
            v-b-modal.modal-1
          >
            <img alt="Vue add" src="../../assets/5.png" />
          </b-button>

          <b-modal
            @close="closeAlert()"
            id="modal-1"
            class="modalAdd"
            title="Add Item"
            hide-footer
            no-close-on-backdrop
          >
            <b-alert variant="success" v-bind:show="alerts">{{
              isMsg
            }}</b-alert>
            <b-alert variant="danger" v-bind:show="alertError">{{
              isMsgError
            }}</b-alert>
            <br />
            <b-container class="addModalContainer">
              <form
                v-show="!isShown"
                class="formAdd"
                v-on:submit.prevent="addProduct"
              >
                <b-form-input
                  id="inputN"
                  type="text"
                  v-model="form.product_name"
                  placeholder="Poduct Name"
                  required
                ></b-form-input>
                <br />
                <b-form-input
                  id="inputPr"
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
                  required
                ></b-form-file>
                <p>(max file size: 1 mb)</p>
                <b-form-select
                  v-model="form.product_status"
                  id="inputS"
                  size="sm"
                  placeholder="Poduct Status"
                  required
                >
                  <option disabled value selected>Poduct Status</option>
                  <option value="1">Active</option>
                  <option value="0">Non-Active</option>
                </b-form-select>
                <b-form-select
                  v-model="form.category_id"
                  id="inputC"
                  size="sm"
                  placeholder="Category"
                  :options="category"
                  required
                ></b-form-select>
                <b-button :disabled="isDisabled" @click.prevent="postProduct"
                  >Add</b-button
                >
              </form>
            </b-container>
          </b-modal>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="add homeSide" xl="12">
        <router-link to="/category" vslot="{ route, navigate}">
          <b-button
            v-if="user.user_role === 1"
            v-b-tooltip.hover.top="'Category'"
            class="historyButton"
          >
            <img alt="Vue history" src="../../assets/list.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="history homeSide" xl="12">
        <router-link to="/user" vslot="{ route, navigate}">
          <b-button
            v-if="user.user_role === 1"
            v-b-tooltip.hover.top="'User Controller'"
          >
            <img alt="Vue history" src="../../assets/settings.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import disabledMixin from '../../mixins/disabledMixin'
export default {
  name: 'Navbar',
  data() {
    return {
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_picture: {},
        product_status: ''
      },
      alerts: false,
      isMsg: '',
      alertError: false,
      isMsgError: '',
      isShown: false,
      products: []
    }
  },
  created() {
    this.getCategory()
  },
  computed: {
    ...mapGetters({
      category: 'getCategoryValue',
      user: 'setUser'
    })
  },
  mixins: [disabledMixin],
  methods: {
    ...mapActions(['addProducts', 'getProducts', 'getCategory']),
    postProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('product_picture', this.form.product_picture)
      this.addProducts(data)
        .then((response) => {
          this.alerts = true
          this.isMsg = response.msg
          this.alertError = false
          this.getProducts()
        })
        .catch((error) => {
          this.alertError = true
          this.isMsgError = error.data.msg
          this.alerts = false
        })
    },
    handleFile(event) {
      this.form.product_picture = event.target.files[0]
    },
    closeAlert() {
      this.form = {
        category_id: '',
        product_name: '',
        product_price: '',
        product_picture: {},
        product_status: ''
      }
      this.form2 = {
        category_name: '',
        category_status: ''
      }
      this.alerts = false
      this.alertError = false
    }
  }
}
</script>

<style src="../../assets/css/homeSelect.css"></style>
