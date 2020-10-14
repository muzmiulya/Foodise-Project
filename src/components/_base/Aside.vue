<template>
  <b-col class="yourcart" md="4">
    <div class="theGrid" v-if="cart.length > 0">
      <div class="gridbox1">
        <div class="orderboxes" v-for="(item, index) in cart" :key="index">
          <div class="item-a">
            <img alt="Vue pictures" :src="urlApi + item.product_picture" />
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
          <div class="totalnumber">Rp. {{ totals }}</div>
        </div>
        <div class="ppn">*belum termasuk ppn</div>
        <div class="checkoutbutton">
          <b-button
            block
            type="button"
            class="btn-primary"
            v-b-modal.modal-checkout
            @click="orderPost"
            >Checkout</b-button
          >
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
                <div class="cashier">
                  Cashier: {{ histories.history_user_name }}
                </div>
                <div class="cashier">
                  Receipt no: #{{ histories.history_invoices }}
                </div>
              </div>
              <div class="secondRow">
                <div
                  class="loopProduct"
                  v-for="(item, index) in cart"
                  :key="index"
                >
                  <div class="ordered">
                    {{ item.product_name }} x{{ item.purchase_qty }}
                  </div>
                  <div class="ordered">
                    Rp. {{ item.product_price * item.purchase_qty }}
                  </div>
                </div>
              </div>
              <div class="secondHalfRow">
                <div class="ppns">PPn 10%</div>
                <div class="ppnPrice">Rp. {{ totals * 0.1 }}</div>
              </div>
              <div class="thirdRow">
                <div class="subTotal">
                  Total: Rp. {{ histories.history_subtotal }}
                </div>
              </div>
              <div class="fourthRow">
                <div class="payment">Payment: Cash</div>
              </div>
              <div class="fifthRow">
                <b-button
                  class="buttonPrint"
                  variant="success"
                  @click="printPdf()"
                  >Print</b-button
                >
              </div>
            </div>
          </b-modal>
        </div>
        <div class="cancelbutton">
          <b-button
            type="submit"
            class="btn-secondary"
            @click="deleteEventAll()"
            >Cancel</b-button
          >
        </div>
      </div>
    </div>
    <div v-else>
      <b-container class="cartInside">
        <img alt="Vue cart" src="../../assets/6.png" />
        <h3 v-orange>Your cart is empty</h3>
        <p ref="checkout">Please add some items from the menu</p>
      </b-container>
    </div>
  </b-col>
</template>

<script>
/* eslint-disable new-cap */
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { jsPDF } from 'jspdf'
export default {
  name: 'Aside',
  data() {
    return {
      urlApi: process.env.VUE_APP_URL + '/',
      histories: []
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart',
      totals: 'computedSum',
      user: 'setUser'
    })
  },
  methods: {
    ...mapMutations(['addToCarts', 'incrementQty', 'decrementQty']),
    ...mapActions(['postOrder']),
    deleteEventAll() {
      this.cart.splice(0, this.cart.length)
    },
    orderPost() {
      const data = { cashier: this.user.user_name, orders: this.cart }
      this.postOrder(data)
        .then((response) => {
          this.histories = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    printPdf() {
      const carts = this.cart
      const history = this.histories
      const total = this.totals
      const doc = new jsPDF()
      doc.text('- Foodsie -', 10, 10)
      doc.text(`Cashier: ${history.history_user_name}`, 20, 20)
      doc.text(`Receipt no: #${history.history_invoices}`, 20, 30)
      doc.text('Items: ', 20, 40)
      let y = 40
      for (let i = 0; i < carts.length; i++) {
        doc.text(
          `${carts[i].product_name} \t Rp.${carts[i].product_price} x${carts[i].purchase_qty} \n`,
          40,
          y
        )
        y = y + 10
      }
      const date = new Date()
      doc.text(`PPn: Rp.${total * 0.1}`, 20, y + 10)
      doc.text(`Total: Rp.${total}`, 20, y + 20)
      doc.text(`Date: ${date}`, 20, y + 30)
      doc.save('receipt.pdf')
    }
  }
}
</script>

<style src="../../assets/css/homeSelect.css"></style>
