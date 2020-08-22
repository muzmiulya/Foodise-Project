<template>
  <b-col class="sideHome" md="1">
    <b-row>
      <b-col class="forkSpoon homeSide" md="">
        <router-link to="/" vslot="{ route, navigate}">
          <button class="forkSpoonButton">
            <img alt="Vue forkSpoon" src="../../assets/3.png" />
          </button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="history homeSide" md="">
        <router-link to="/history" vslot="{ route, navigate}">
          <button class="historyButton">
            <img alt="Vue history" src="../../assets/4.png" />
          </button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="addButton homeSide" md="">
        <button type="submit">
          <img alt="Vue add" src="../../assets/5.png" />
        </button>
      </b-col>
    </b-row>
  </b-col>
</template>

<style src="../../assets/css/homeSelect.css"></style>
