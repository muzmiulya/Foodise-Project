<template>
  <b-container fluid>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
      integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
      crossorigin="anonymous"
    />
    <b-col md class="d-flex justify-content-center h-100">
      <b-card class="align-content-center">
        <b-row class="separate">
          <b-col class="toHome">
            <b-button
              variant="success"
              v-b-tooltip.hover.top="'Add Category'"
              class="addC"
              v-b-modal.modal-add
            >
              <img alt="Vue forkSpoon" src="../../assets/plus-sign.png" />
            </b-button>
          </b-col>
          <b-modal
            id="modal-add"
            class="modalAdd"
            title="Add Category"
            hide-footer
            no-close-on-backdrop
            @close="alertClose()"
          >
            <b-container>
              <b-alert variant="success" v-bind:show="alert">{{
                isMsg
              }}</b-alert>
              <b-alert variant="danger" v-bind:show="alertError">{{
                isMsgError
              }}</b-alert>
              <form class="formAdd">
                <b-form-input
                  type="text"
                  v-model="form2.category_name"
                  placeholder="Category Name"
                  required
                ></b-form-input>
                <br />
                <b-form-select
                  v-model="form2.category_status"
                  id="inputS"
                  size="sm"
                  placeholder="Category Status"
                  required
                >
                  <option disabled value selected>Category Status</option>
                  <option value="1">Active</option>
                  <option value="0">Non-Active</option>
                </b-form-select>
                <br />
                <b-button :disabled="isDisabled2" @click="addCategory()"
                  >Add</b-button
                >
              </form>
            </b-container>
          </b-modal>
          <b-col class="toHome">
            <router-link to="/" vslot="{ route, navigate}">
              <b-button v-b-tooltip.hover.top="'Home'">
                <img alt="Vue forkSpoon" src="../../assets/3.png" />
              </b-button>
            </router-link>
          </b-col>
        </b-row>

        <b-table
          class="tableOrder"
          striped
          hover
          :items="categories"
          :fields="fields"
          :per-page="perPages"
          :current-page="currentPage"
        >
          <template v-slot:cell(actions)="row">
            <b-button
              variant="warning"
              size="sm"
              @click="setCategory(row.item, row.index, $event.target)"
              class="mr-1"
              v-b-modal.modal-update
              ><i class="fas fa-edit"></i
            ></b-button>
            <b-button
              variant="danger"
              size="sm"
              @click="setDelete(row.item, row.index, $event.target)"
              class="mr-1"
              v-b-modal.modal-delete
              ><i class="far fa-trash-alt"></i
            ></b-button>
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
          title="Update Category"
          hide-footer
          no-close-on-backdrop
          @close="alertClose()"
        >
          <b-container>
            <b-alert variant="success" v-bind:show="alert">{{ isMsg }}</b-alert>
            <b-alert variant="danger" v-bind:show="alertError">{{
              isMsgError
            }}</b-alert>
            <form class="formAdd">
              <b-form-input
                type="text"
                v-model="form.category_name"
                placeholder="Category Name"
                required
              ></b-form-input>
              <br />
              <b-form-select
                v-model="form.category_status"
                id="inputS"
                size="sm"
                placeholder="Category Status"
                required
              >
                <option disabled value selected>Category Status</option>
                <option value="1">Active</option>
                <option value="0">Non-Active</option>
              </b-form-select>
              <br />
              <b-button :disabled="isDisabled" @click="patchCategory()"
                >Update</b-button
              >
            </form>
          </b-container>
        </b-modal>
        <b-modal
          id="modal-delete"
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
              @click="$bvModal.hide('modal-delete')"
              >Cancel</b-button
            >
            <b-button
              class="buttonYesDel"
              pill
              variant="danger"
              @click="delCategory(), $bvModal.hide('modal-delete')"
              >Yes</b-button
            >
          </b-container>
        </b-modal>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Category',
  data() {
    return {
      currentPage: 1,
      fields: [
        { key: 'category_id', label: 'Id' },
        { key: 'category_name', label: 'Name' },
        { key: 'category_status', label: 'Status' },
        { key: 'actions', label: 'Actions' }
      ],
      form: {
        category_name: '',
        category_status: ''
      },
      form2: {
        category_name: '',
        category_status: ''
      },
      category_id: '',
      alert: false,
      isMsg: '',
      alertError: false,
      isMsgError: '',
      alerDel: false,
      isMsgDel: ''
    }
  },
  created() {
    this.getCategory()
  },
  computed: {
    ...mapGetters({
      categories: 'getCategory',
      totallRows: 'getRoww',
      perPages: 'getPerP'
    }),
    rows() {
      return this.totallRows
    },
    isDisabled() {
      return this.form.category_name <= 0 || this.form.category_status <= 0
    },
    isDisabled2() {
      return this.form2.category_name <= 0 || this.form2.category_status <= 0
    }
  },
  methods: {
    ...mapActions([
      'getCategory',
      'addCategories',
      'updateCategory',
      'deleteCategory'
    ]),
    ...mapMutations(['setPagess']),
    handlePageChange(event) {
      this.setPagess(event)
      this.getCategory()
    },
    alertClose() {
      this.alert = false
    },
    addCategory() {
      this.addCategories(this.form2)
        .then((response) => {
          this.alert = true
          this.isMsg = response.msg
          this.getCategory()
        })
        .catch((error) => {
          this.alertError = true
          this.isMsgError = error.data.msg
        })
    },
    setCategory(data) {
      this.form = {
        category_name: data.category_name,
        category_status: data.category_status
      }
      this.category_id = data.category_id
    },
    patchCategory() {
      const setData = {
        category_id: this.category_id,
        form: this.form
      }
      this.updateCategory(setData)
        .then((response) => {
          this.alert = true
          this.isMsg = response.msg
          this.getCategory()
        })
        .catch((error) => {
          this.alertError = true
          this.isMsgError = error.data.msg
        })
    },
    setDelete(data) {
      this.category_id = data.category_id
    },
    delCategory() {
      this.deleteCategory(this.category_id)
        .then((response) => {
          this.alertDel = true
          this.isMsgDel = response.msg
          this.getCategory()
        })
        .catch((error) => {
          this.alertDel = true
          this.isMsgDel = error.data.msg
        })
    }
  }
}
</script>

<style scoped>
.addC {
  max-width: 100%;
  max-height: 100%;
  align-content: center;
  background-color: transparent;
  border: none;
  height: 60px;
}
.buttonLogSign {
  font-weight: bold;
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

.separate {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}
.toHome button {
  max-width: 100%;
  max-height: 100%;
  align-content: center;
  background-color: transparent;
  border: none;
  height: 60px;
}
.toHome img {
  background: transparent;
  max-width: 100%;
  width: 35px;
  height: auto;
}
</style>
