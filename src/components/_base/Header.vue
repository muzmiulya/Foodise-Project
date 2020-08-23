<template>
  <b-col class="firstColumn" xl="8" lg="8" md="8" sm="12" xs="12">
    <b-row>
      <b-col class="homeButton" xl="" lg="" md="" sm="">
        <img alt="Vue home" src="../../assets/1.png" />
      </b-col>
      <b-col class="foodItems" xl="9" lg="9" md="9" sm="9">
        <h2>Food Items</h2>
        <b-container>
          <b-row>
            <b-col cols="6">
              <input
                type="text"
                v-model="search"
                placeholder="Search Product"
                v-on:change="search_product()"
              />
            </b-col>
          </b-row>
        </b-container>
        <hr />
      </b-col>
      <b-col class="searchButton" xl="" lg="" md="" sm="">
        <img alt="Vue search" src="../../assets/2.png" />
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      search: ''
    }
  },
  watch: {
    search: function() {
      console.log(this.search)
    }
  },
  methods: {
    search_product() {
      const searched = this.search
      console.log(searched)
      this.$emit('search_product', searched)
    }
  }
}
</script>
<style src="../../assets/css/homeSelect.css"></style>
