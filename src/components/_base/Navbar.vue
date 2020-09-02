<template>
  <b-col class="sideHome" xl="1" lg="1" md="1">
    <b-row>
      <b-col class="forkSpoon homeSide" xl="12">
        <router-link to="/" vslot="{ route, navigate}">
          <b-button class="forkSpoonButton">
            <img alt="Vue forkSpoon" src="../../assets/3.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="history homeSide" xl="12">
        <router-link to="/history" vslot="{ route, navigate}">
          <b-button class="historyButton">
            <img alt="Vue history" src="../../assets/4.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="add homeSide" xl="12">
        <div>
          <b-button class="addButton" v-b-modal.modal-1>
            <img alt="Vue add" src="../../assets/5.png" />
          </b-button>

          <b-modal id="modal-1" class="modalAdd" title="Add Item" hide-footer no-close-on-backdrop>
            <b-container>
              <b-alert v-bind:show="alert">{{ isMsg }}</b-alert>
              <form class="formAdd" v-on:submit.prevent="addProduct">
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

                <b-form-input
                  id="inputPi"
                  type="text"
                  v-model="form.product_picture"
                  placeholder="Poduct Picture"
                  required
                ></b-form-input>
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
                  required
                >
                  <option disabled value selected>Category</option>
                  <option value="1">Food</option>
                  <option value="2">Drink</option>
                </b-form-select>
                <b-button :disabled="isDisabled" @click="addProduct()">Add</b-button>
              </form>
            </b-container>
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Navbar',
  data() {
    return {
      count: 0,
      page: 1,
      limit: 9,
      sort: '',
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
      product_id: '',
      products: []
    }
  },
  // watcher: {
  //   form: function () {
  //     console.log(this.form)
  //   }
  // },
  computed: {
    isDisabled() {
      return (
        this.form.product_name <= 0 ||
        this.form.product_price <= 0 ||
        this.form.product_picture <= 0 ||
        this.form.product_status <= 0 ||
        this.form.category_id <= 0
      )
    }
  },
  methods: {
    // onClickButton(event) {
    //   this.$emit('adds', this.form)
    //   console.log(this.form)
    // }
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3001/product', this.form)
        .then((response) => {
          this.alert = true
          this.isMsg = response.data.msg
          // this.get_product()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style src="../../assets/css/homeSelect.css"></style>
