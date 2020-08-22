<template>
  <b-col class="gridbackground" md="7">
    <div class="main">
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="4" v-for="(item, index) in products" :key="index">
            <b-card
              v-bind:title="item.product_name"
              img-src="https://picsum.photos/600/300/?image=25"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                {{ item.product_price }}
              </b-card-text>
              <b-button variant="primary" @click="addToCart(item)"
                >Add to Cart</b-button
              >
              <b-button variant="success" @click="setProduct(item)"
                >Update</b-button
              >
              <b-button variant="danger" @click="deleteProduct(item)"
                >Delete</b-button
              >
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-col>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Main',
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 4,
      sort: '',
      products: []
    }
  },
  created() {
    this.get_product()
  },
  methods: {
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        qty: 1
      }
      // spread operator
      this.cart = [...this.cart, setCart]
      console.log(this.cart)
    },
    get_product() {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${this.page}&limit=${this.limit}`
        )
        .then(response => {
          this.products = response.data.data
          console.log(this.products)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3001/product', this.form)
        .then(response => {
          console.log(response)
          this.alert = true
          this.isMsg = response.data.msg
        })
        .catch(error => {
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
      // axios
      //   .patch(`http://127.0.0.1:3001/product/${id}`, this.form)
      //   .then(response => {
      //     console.log(response)
      //     this.alert = true
      //     this.isMsg = response.data.msg
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    deleteProduct(data) {
      console.log(data.product_id)
    }
  }
}
</script>
<style src="../../assets/css/homeSelect.css"></style>

<!-- <div class="grid-container">
      <div class="pictures">
        <img alt="Vue pictures" src="../../assets/7.jpg" />
        <h4>Espresso</h4>
        <p>Rp.10.000</p>
      </div>
      <div class="pictures">
        <img alt="Vue pictures" src="../../assets/8.jpg" />
        <h4>Cofee Latte</h4>
        <p>Rp.15.000</p>
      </div>
      <div class="pictures">
        <img alt="Vue pictures" src="../../assets/9.jpg" />
        <h4>Cappucino</h4>
        <p>Rp.5.000</p>
      </div>
      <div class="pictures">
        <img alt="Vue pictures" src="../../assets/10.jpg" />
        <h4>Red Velvet Latte</h4>
        <p>Rp.33.000</p>
      </div>
      <div class="pictures">
        <img alt="Vue pictures" src="../../assets/11.jpg" />
        <h4>Choco Rum</h4>
        <p>Rp.28.000</p>
      </div>
      <div class="pictures">
        <img alt="Vue pictures" src="../../assets/12.jpg" />
        <h4>Black Forest</h4>
        <p>Rp.30.000</p>
      </div>
      <div class="pictures">
        <img alt="Vue pictures" src="../../assets/13.jpg" />
        <h4>Chicken Katsu Dabu-dabu</h4>
        <p>Rp.60.000</p>
      </div>
      <div class="pictures">
        <img alt="Vue pictures" src="../../assets/14.jpg" />
        <h4>Salmon Truffle Teriyaki</h4>
        <p>Rp.60.000</p>
      </div>
      <div class="pictures">
        <img alt="Vue pictures" src="../../assets/15.jpg" />
        <h4>Wiener Schnitzel</h4>
        <p>Rp.69.000</p>
      </div>
    </div> -->
