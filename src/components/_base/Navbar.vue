<template>
  <b-col class="sideHome" md="1">
    <b-row>
      <b-col class="forkSpoon homeSide" md="">
        <router-link to="/" vslot="{ route, navigate}">
          <b-button class="forkSpoonButton">
            <img alt="Vue forkSpoon" src="../../assets/3.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="history homeSide" md="">
        <router-link to="/history" vslot="{ route, navigate}">
          <b-button class="historyButton">
            <img alt="Vue history" src="../../assets/4.png" />
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="addButton homeSide" md="">
        <div>
          <b-button v-b-modal.modal-1>
            <img alt="Vue add" src="../../assets/5.png" />
          </b-button>
          <b-modal id="modal-1" title="Add Item">
            <p class="my-4">Hello from modal!</p>
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </b-col>
</template>

<style src="../../assets/css/homeSelect.css"></style>
