<template>
  <div>
    <h1>Page Product</h1>
    <form>
      <input type="text" v-model="form.product_name" placeholder="Product Name..." />
      <br />
      <input type="text" v-model="form.product_price" placeholder="Product Price..." />
      <br />
      <input type="text" v-model="form.category_id" placeholder="Category Id..." />
      <br />
      <input type="text" v-model="form.product_status" placeholder="Product Status..." />
      <br />
      <input type="file" @change="handleFile" />
      <br />
      <button @click.prevent="postProduct">Submit</button>
      <!-- <button>Update</button> -->
      <br />
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Product',
  data() {
    return {
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_picture: {},
        product_status: ''
      }
    }
  },
  methods: {
    ...mapActions(['addProducts']),
    handleFile(event) {
      this.form.product_picture = event.target.files[0]
      console.log(event.target.files[0])
    },
    postProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('product_picture', this.form.product_picture)
      this.addProducts(data)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      //   console.log(this.form)
    }
    // addProduct() {
    //   console.log(this.form)
    // }
  }
}
</script>
