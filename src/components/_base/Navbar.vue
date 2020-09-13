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
            <b-alert v-bind:show="alerts">{{ isMsg }}</b-alert>
            <b-button
              class="buttonChange"
              variant="success"
              v-show="!isShown"
              @click="isShown = !isShown"
              >Category</b-button
            >
            <b-button
              class="buttonChange"
              variant="success"
              v-show="isShown"
              @click="isShown = !isShown"
              >Product</b-button
            >
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
                <br />
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
              <form
                v-show="isShown"
                class="formAdd"
                v-on:submit.prevent="addProduct"
              >
                <b-form-input
                  id="inputCN"
                  type="text"
                  v-model="form2.category_name"
                  placeholder="Category Name"
                  required
                ></b-form-input>
                <br />
                <b-form-select
                  v-model="form2.category_status"
                  id="inputCS"
                  size="sm"
                  placeholder="Category Status"
                  required
                >
                  <option disabled value selected>Category Status</option>
                  <option value="1">Active</option>
                  <option value="0">Non-Active</option>
                </b-form-select>
                <br />
                <b-button :disabled="isDisabled2" @click="addCategory()"
                  >Add</b-button
                >
              </form>
            </b-container>
          </b-modal>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="history homeSide" xl="12">
        <b-button
          v-b-tooltip.hover.top="'Logout'"
          class="logout"
          @click="handleLogout"
        >
          <img alt="Vue history" src="../../assets/signout.png" />
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="history homeSide" xl="12">
        <router-link to="/user" vslot="{ route, navigate}">
          <b-button
            v-if="user.user_role === 1"
            v-b-tooltip.hover.top="'User Controller'"
          >
            <img alt="Vue history" src="../../assets/users.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import disabledMixin from '../../mixins/disabledMixin'
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
      form2: {
        category_name: '',
        category_status: ''
      },
      alerts: false,
      isMsg: '',
      isShown: false,
      products: []
    }
  },
  created() {
    this.getCategory()
  },
  computed: {
    ...mapGetters({
      category: 'getCategory',
      user: 'setUser'
    }),
    isDisabled() {
      return (
        this.form.product_name <= 0 ||
        this.form.product_price <= 0 ||
        this.form.product_status <= 0 ||
        this.form.category_id <= 0
      )
    },
    isDisabled2() {
      return this.form2.category_name <= 0 || this.form2.category_status <= 0
    }
  },
  // mixins: [disabledMixin],
  methods: {
    ...mapActions([
      'addProducts',
      'addCategories',
      'getProducts',
      'getCategory'
    ]),
    ...mapActions({ handleLogout: 'logout' }),

    // handleLogout() {
    //   console.log('logout clicked')
    // },
    postProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('product_picture', this.form.product_picture)
      console.log(data)
      this.addProducts(data)
        .then(response => {
          this.alerts = true
          this.isMsg = response.msg
          this.getProducts()
        })
        .catch(error => {
          this.alerts = true
          this.isMsg = error.data.msg
        })
    },
    addCategory() {
      this.addCategories(this.form2)
        .then(response => {
          this.alerts = true
          this.isMsg = response.msg
          this.getCategory()
        })
        .catch(error => {
          this.alerts = true
          this.isMsg = error.data.msg
        })
    },
    handleFile(event) {
      this.form.product_picture = event.target.files[0]
      console.log(event.target.files[0])
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
    }
  }
}
</script>

<style src="../../assets/css/homeSelect.css"></style>
