<template>
  <b-row>
    <b-col class="firstColumn" xl="8" lg="8" md="8" sm="12">
      <b-row class="firstRow">
        <b-col class="homeButton" xl lg md sm>
          <img alt="Vue home" src="../../assets/1.png" />
        </b-col>
        <b-col class="foodItems" xl="8" lg="7" md="7" sm="7">
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
        <b-col class="searchButton" xl lg md sm>
          <b-button type="reset" @click="isSearch = !isSearch">
            <img alt="Vue search" src="../../assets/2.png" />
          </b-button>
        </b-col>
        <b-col class="searchButton" xl lg md sm>
          <b-button id="popover-target-1">
            <img alt="Vue history" src="../../assets/users.png" />
          </b-button>
          <b-popover target="popover-target-1" triggers="hover" placement="top">
            <h5>{{ user.user_name }}</h5>
            <br />
            <b-button
              v-b-tooltip.hover.top="'Logout'"
              v-b-modal.modal-logout
              id="popover-target-1"
              class="logoutButton"
            >
              <img alt="Vue history" src="../../assets/logout.png" />
            </b-button>
          </b-popover>
        </b-col>
        <b-modal
          id="modal-logout"
          hide-header
          hide-footer
          no-close-on-backdrop
          no-close-on-esc
        >
          <b-container class="modaldelete">
            <div class="youSure">
              <h3>Are You Sure?</h3>
            </div>
            <br />
            <b-button
              class="buttonCancelDel"
              pill
              variant="warning"
              @click="$bvModal.hide('modal-logout')"
              >Cancel</b-button
            >
            <b-button
              class="buttonYesDel"
              pill
              variant="danger"
              @click="handleLogout(), $bvModal.hide('modal-logout')"
              >Yes</b-button
            >
          </b-container>
        </b-modal>
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
      search: 'getSearch',
      user: 'setUser'
    })
  },
  methods: {
    ...mapActions({ handleLogout: 'logout' }),
    ...mapActions(['getProducts', 'searchProduct']),
    ...mapMutations(['setSearch']),
    handleSearch(event) {
      this.$router.push(`?keyword=${event}`)
      this.setSearch(event)
      this.searchProduct()
    }
  }
}
</script>
<style src="../../assets/css/homeSelect.css"></style>
