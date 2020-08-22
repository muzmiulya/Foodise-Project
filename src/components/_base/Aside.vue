<template>
  <b-col class="yourcart" md="4">
    <div class="theGrid">
      <div class="gridbox1">
        <div class="orderboxes">
          <div class="item-a">
            <img alt="Vue pictures" src="../../assets/8.jpg" />
          </div>
          <div class="item-b">
            <p>Cofee Latte</p>
          </div>
          <div class="item-c">
            <div class="item-cPrice">
              <p>Rp. 15.000</p>
            </div>
          </div>
          <div class="item-d">
            <button type="submit">
              <img alt="Vue pictures" src="../../assets/minus.png" />
            </button>
          </div>
          <div class="item-e">
            <h5>1</h5>
          </div>
          <div class="item-f">
            <button type="submit">
              <img alt="Vue pictures" src="../../assets/plus.png" />
            </button>
          </div>
        </div>
        <div class="orderboxes">
          <div class="item-a">
            <img alt="Vue pictures" src="../../assets/12.jpg" />
          </div>
          <div class="item-b">
            <p>Black Forest</p>
          </div>
          <div class="item-c">
            <div class="item-cPrice">
              <p>Rp. 30.000</p>
            </div>
          </div>
          <div class="item-d">
            <button type="submit">
              <img alt="Vue pictures" src="../../assets/minus.png" />
            </button>
          </div>
          <div class="item-e">
            <h5>1</h5>
          </div>
          <div class="item-f">
            <button type="submit">
              <img alt="Vue pictures" src="../../assets/plus.png" />
            </button>
          </div>
        </div>
        <div class="orderboxes">
          <div class="item-a">
            <img alt="Vue pictures" src="../../assets/14.jpg" />
          </div>
          <div class="item-b">
            <p>Salmon Truffle</p>
          </div>
          <div class="item-c">
            <div class="item-cPrice">
              <p>Rp. 60.000</p>
            </div>
          </div>
          <div class="item-d">
            <button type="submit">
              <img alt="Vue pictures" src="../../assets/minus.png" />
            </button>
          </div>
          <div class="item-e">
            <h5>1</h5>
          </div>
          <div class="item-f">
            <button type="submit">
              <img alt="Vue pictures" src="../../assets/plus.png" />
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
          >
            Checkout
          </button>
        </div>
        <div class="cancelbutton">
          <button type="button" class="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </b-col>
</template>

<style src="../../assets/css/homeSelect.css"></style>
