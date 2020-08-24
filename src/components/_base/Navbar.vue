<template>
  <b-col class="sideHome" md="1">
    <b-row>
      <b-col class="forkSpoon homeSide" md>
        <router-link to="/" vslot="{ route, navigate}">
          <b-button class="forkSpoonButton">
            <img alt="Vue forkSpoon" src="../../assets/3.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="history homeSide" md>
        <router-link to="/history" vslot="{ route, navigate}">
          <b-button class="historyButton">
            <img alt="Vue history" src="../../assets/4.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="addButton homeSide" md>
        <div>
          <b-button v-b-modal.modal-1>
            <img alt="Vue add" src="../../assets/5.png" />
          </b-button>
          <b-modal id="modal-1" class="modalAdd" title="Add Item" hide-footer no-close-on-backdrop>
            <b-container>
              <b-alert v-bind:show="alert">{{ isMsg }}</b-alert>
              <form class="formAdd" v-on:submit.prevent="addProduct">
                <input type="text" v-model="form.product_name" placeholder="Poduct Name" />
                <br />
                <input type="text" v-model="form.product_price" placeholder="Poduct Price" />
                <br />
                <input type="text" v-model="form.product_picture" placeholder="Poduct Picture" />
                <br />
                <input type="text" v-model="form.product_status" placeholder="Poduct Status" />
                <br />
                <select v-model="form.category_id">
                  <option value>Category</option>
                  <option value="1">Food</option>
                  <option value="2">Drink</option>
                </select>
                <button type="submit">Add</button>
                <!-- <button type="button" v-show="isUpdate" @click="patchProduct()">Update</button> -->
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
  watcher: {
    form: function () {
      console.log(this.form)
    }
  },
  methods: {
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3001/product', this.form)
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

<style src="../../assets/css/homeSelect.css"></style>
