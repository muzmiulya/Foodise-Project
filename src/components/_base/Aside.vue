<template>
  <b-col class="yourcart" md="4">
    <div class="theGrid" v-if="cart.length > 0">
      <div class="gridbox1">
        <div class="orderboxes" v-for="(item, index) in cart" :key="index">
          <div class="item-a">
            <img alt="Vue pictures" src="../../assets/7.jpg" />
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
            <b-button type="button" :disabled="item.purchase_qty === 1" @click="decrementQty(item)">
              <img alt="Vue pictures" src="../../assets/minus.png" />
            </b-button>
          </div>
          <div class="item-e">
            <h5>{{ item.purchase_qty }}</h5>
          </div>
          <div class="item-f">
            <b-button type="button" @click="incrementQty(item)">
              <img alt="Vue pictures" src="../../assets/plus.png" />
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
            @close="deleteEventAll()"
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
                <b-button class="buttonPrint" variant="success" @click="deleteEventAll()">Print</b-button>
              </div>
              <div class="sixthRow">
                <h6>Or</h6>
              </div>
              <div class="seventhRow">
                <b-button
                  class="buttonSendEmail"
                  variant="primary"
                  @click="deleteEventAll()"
                >Send Email</b-button>
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
        <img alt="Vue cart" src="../../assets/6.png" />
        <h3>Your cart is empty</h3>
        <p>Please add some items from the menu</p>
      </b-container>
    </div>
  </b-col>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Aside',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      cart: 'getCart'
    }),
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
    ...mapMutations(['addToCarts']),
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
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
    // addToCart(data) {
    //   const setCart = {
    //     product_id: data.product_id,
    //     purchase_qty: 1,
    //     product_name: data.product_name,
    //     product_price: data.product_price
    //   }
    //   this.cart = [...this.cart, setCart]
    // },
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

<style src="../../assets/css/homeSelect.css"></style>
