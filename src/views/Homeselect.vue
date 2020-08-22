<template>
  <div class="homeSelect">
    <b-container fluid>
      <b-row>
        <Header />
        <b-col class="myCart" xl="4" lg="4" md="4" sm="12">
          Cart
          <span class="badge badge-pill badge-primary" id="badge">0</span>
        </b-col>
      </b-row>
      <b-row>
        <Navbar />
        <Main />
        <Aside />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/_base/Navbar'
import Header from '../components/_base/Header'
import Main from '../components/_base/Main'
import Aside from '../components/_base/Aside'
export default {
  name: 'Homeselect',
  data() {
    return {
      name: 'Muhammad Muzmi Ulya',
      message: 'Hello',
      a: 'Hai',
      b: 'Muzmi',
      isFulled: false,
      product: [
        { name: 'kipas', price: 100000 },
        { name: 'mouse', price: 50000 }
      ],
      url_google: 'http://google.com',
      isTrue: {
        color: 'black'
      },
      isFalse: {
        color: 'red'
      }
    }
  },
  components: {
    Navbar,
    Header,
    Main,
    Aside
  },
  computed: {
    reverseMessage: function() {
      return this.message
        .split('')
        .reverse()
        .join('')
    },
    greeting: {
      get() {
        return this.a + ' ' + this.b
      },
      set(newValue) {
        const value = newValue.split(' ')
        this.a = value[0]
        this.b = value[1]
      }
    }
  },
  methods: {
    boom() {
      console.log('Boom')
      alert('boom')
    },
    search() {
      console.log('Search')
      alert('Search')
    }
  }
}
</script>

<style src="../assets/css/homeSelect.css"></style>
