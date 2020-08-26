<template>
  <b-container fluid>
    <b-row>
      <b-col class="firstColumn" lg="12">
        <b-row>
          <b-col class="homeButton" lg="1">
            <img alt="Vue home" src="../assets/1.png" />
          </b-col>
          <b-col class="history" lg="11">
            <h2>History</h2>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <Navbar />
      <b-col class="historyBg" lg>
        <div class="histories"></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from '../components/_base/Navbar'
export default {
  name: 'History',
  components: {
    Navbar
  }
}
</script>

<style scoped>
.history {
  text-align: center;
}
.historyBg {
  background-color: lightgrey;
}
</style>
