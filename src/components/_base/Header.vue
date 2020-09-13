<template>
  <b-row>
    <b-col class="firstColumn" xl="8" lg="8" md="8" sm="12" cols="12">
      <b-row>
        <b-col class="homeButton" xl lg md sm cols="3">
          <img alt="Vue home" src="../../assets/1.png" />
        </b-col>
        <b-col class="foodItems" xl="9" lg="8" md="8" sm="8" cols="6">
          <div>
            <h2 v-show="!isSearch">Foodsie</h2>
            <b-container v-show="isSearch">
              <b-row>
                <form></form>
                <b-col xl="12">
                  <b-form-input
                    type="search"
                    v-model="searching"
                    v-show="isSearch"
                    placeholder="Search Product"
                    v-on:change="handleSearch"
                    class="searchProduct"
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </b-col>
        <b-col class="searchButton" xl lg="2" md="2" sm="2" cols="3">
          <b-button
            class="buttonSearch"
            type="reset"
            @click="isSearch = !isSearch"
          >
            <img alt="Vue search" src="../../assets/2.png" />
          </b-button>
        </b-col>
      </b-row>
    </b-col>
    <b-col class="myCart" xl="4" lg="4" md="4" sm="12">
      Cart
      <span class="badge badge-pill badge-primary">{{ increments }}</span>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Header',
  props: ['increments'],
  data() {
    return {
      searching: '',
      isSearch: false
    }
  },
  computed: {
    ...mapGetters({
      search: 'getSearch'
    })
  },
  methods: {
    ...mapActions(['getProducts', 'searchProduct']),
    ...mapMutations(['setSearch']),
    handleSearch(event) {
      this.$router.push(`?keyword=${event}`)
      this.setSearch(event)
      // this.search = event
      this.searchProduct()
    }
  }
}
</script>
<style src="../../assets/css/homeSelect.css"></style>
