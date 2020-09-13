<template>
  <b-container fluid>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
      integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
      crossorigin="anonymous"
    />

    <!-- <Navbar></Navbar> -->
    <b-col md class="d-flex justify-content-center h-100">
      <b-card class="align-content-center">
        <div class="buttons">
          <b-col class="forkSpoon homeSide" xl="12">
            <router-link to="/" vslot="{ route, navigate}">
              <b-button v-b-tooltip.hover.top="'Home'" class="forkSpoonButton">
                <img alt="Vue forkSpoon" src="../../assets/3.png" />
              </b-button>
            </router-link>
          </b-col>
        </div>
        <b-table
          class="tableOrder"
          striped
          hover
          :items="users"
          :fields="fields"
          :per-page="perPages"
          :current-page="currentPage"
        >
          <template v-slot:cell(actions)="row">
            <b-button
              variant="warning"
              size="sm"
              @click="setUser(row.item, row.index, $event.target)"
              class="mr-1"
              v-b-modal.modal-update
            >Update</b-button>
            <b-button
              variant="danger"
              size="sm"
              @click="setDelete(row.item, row.index, $event.target)"
              class="mr-1"
              v-b-modal.modal-delete
            >Delete</b-button>
          </template>
        </b-table>
        <div class="paginations">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPages"
            size="md"
            class="my-0"
            @change="handlePageChange"
          ></b-pagination>
        </div>
        <b-modal
          id="modal-update"
          class="modalAdd"
          title="Update Item"
          hide-footer
          no-close-on-backdrop
          @close="alertClose()"
        >
          <b-container>
            <b-alert v-bind:show="alert">{{ isMsg }}</b-alert>
            <form class="formAdd" v-on:submit.prevent="patchUser">
              <b-form-input
                type="text"
                v-model="form.user_password"
                placeholder="Password"
                required
              ></b-form-input>
              <br />
              <b-form-input type="text" v-model="form.user_name" placeholder="User Name" required></b-form-input>
              <br />
              <b-form-input type="text" v-model="form.user_role" placeholder="User Role" required></b-form-input>
              <br />
              <b-form-input type="text" v-model="form.user_status" placeholder="Status" required></b-form-input>
              <br />
              <b-button type="submit" @click="patchUser()">Update</b-button>
            </form>
          </b-container>
        </b-modal>
        <b-modal id="modal-delete" hide-header hide-footer no-close-on-backdrop no-close-on-esc>
          <b-container class="modaldelete">
            <div class="youSure">
              <h3>Are You Sure?</h3>
            </div>
            <br />
            <b-button
              class="buttonCancelDel"
              pill
              variant="warning"
              @click="$bvModal.hide('modal-delete')"
            >Cancel</b-button>
            <b-button
              class="buttonYesDel"
              pill
              variant="danger"
              @click="delUser(), $bvModal.hide('modal-delete')"
            >Yes</b-button>
          </b-container>
        </b-modal>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
// import axios from 'axios'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
      currentPage: 1,
      // perPage: 7,
      // users: [],
      // totalRows: null,
      fields: [
        { key: 'user_id', label: 'Id' },
        { key: 'user_email', label: 'Email' },
        { key: 'user_password', label: 'Password' },
        { key: 'user_name', label: 'User Name' },
        { key: 'user_role', label: 'User Role' },
        { key: 'user_status', label: 'User Status' },
        { key: 'actions', label: 'Actions' }
      ],
      // infoModal: {
      //   id: 'info-modal',
      //   title: '',
      //   content: ''
      // },
      form: {
        user_name: '',
        user_password: '',
        user_role: '',
        user_status: ''
      },
      // user_id: '',
      alert: false,
      alerDel: false,
      isMsg: '',
      isMsgDel: ''
    }
  },
  created() {
    this.getAllUser()
  },
  computed: {
    ...mapGetters({
      users: 'getUsers',
      totallRows: 'getRowses',
      perPages: 'getPerPages'
    }),
    rows() {
      return this.totallRows
    }
  },
  methods: {
    ...mapActions(['getAllUser', 'updateUser', 'deleteUser']),
    ...mapMutations(['setPagess']),
    handlePageChange(event) {
      // this.currentPage = event
      this.setPagess(event)
      this.getAllUser()
    },
    alertClose() {
      this.alert = false
    },
    // getAllUser() {
    //   axios
    //     .get('http://127.0.0.1:3001/users/user')
    //     .then(response => {
    //       this.users = response.data.data
    //       this.totalRows = response.data.data.length
    //       // this.getIncomeToday()
    //       // console.log(this.todayIncome)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    setUser(data) {
      this.form = {
        user_name: data.user_name,
        user_password: data.user_password,
        user_role: data.user_role,
        user_status: data.user_status
      }

      this.user_id = data.user_id
      // console.log(this.user_id)
      // console.log(this.form)
    },
    // patchUser() {
    //   //   console.log(this.user_id)
    //   //   console.log(this.form)
    //   axios
    //     .patch(`http://127.0.0.1:3001/users/patch/${this.user_id}`, this.form)
    //     .then((response) => {
    //       console.log(response)
    //       this.alert = true
    //       this.isMsg = response.data.msg
    //       this.getAllUser()
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    patchUser() {
      const setData = {
        user_id: this.user_id,
        form: this.form
      }
      this.updateUser(setData)
        .then((response) => {
          this.alert = true
          this.isMsg = response.msg
          this.getAllUser()
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    },
    setDelete(data) {
      this.user_id = data.user_id
    },
    delUser() {
      this.deleteUser(this.user_id)
        .then((response) => {
          this.alertDel = true
          this.isMsgDel = response.msg
          this.getAllUser()
        })
        .catch((error) => {
          this.alertDel = true
          this.isMsgDel = error.data.msg
        })
    }
    // deleteUser() {
    //   axios
    //     .delete(`http://127.0.0.1:3001/users/delete/${this.user_id}`)
    //     .then((response) => {
    //       this.alert = true
    //       this.isMsg = response.data.msg
    //       this.getAllUser()
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }
  }
}
</script>

<style scoped>
.buttonLogSign {
  font-weight: bold;
}

.buttons {
  display: flex;
  flex-direction: column;
}
.card {
  margin-top: auto;
  margin-bottom: auto;
  height: auto;
  text-align: center;
  max-width: 100%;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
}
.card-body {
  background: whitesmoke;
  overflow: scroll;
}
.container-fluid {
  height: 1000px;
  background: linear-gradient(
    278.29deg,
    #1fa2ff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
}
.container-fluid h3 {
  text-align: center;
}
</style>
