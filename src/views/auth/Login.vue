<template>
  <b-container fluid>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
      integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
      crossorigin="anonymous"
    />
    <div class="d-flex justify-content-center h-100">
      <b-card class="align-content-center" v-show="!isShown">
        <b-alert variant="success" v-bind:show="alerts">{{ isMsg }}</b-alert>
        <b-alert variant="danger" v-bind:show="alertError">{{
          isMsgError
        }}</b-alert>
        <h3>Please Login</h3>
        <br />
        <form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-input-group>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="far fa-envelope"></i>
              </span>
            </div>
            <b-form-input
              type="email"
              v-model="form.user_email"
              placeholder="Email..."
              required
            ></b-form-input>
          </b-input-group>
          <br />
          <b-input-group>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <b-form-input
              type="password"
              v-model="form.user_password"
              placeholder="Password..."
              required
            ></b-form-input>
          </b-input-group>
          <br />
          <b-button
            :disabled="isDisabled2"
            class="btn-block"
            variant="primary"
            @click="onSubmit()"
            >Log in</b-button
          >
          <br />
          <b-button class="btn-block" type="reset">Reset</b-button>
        </form>
        <hr />
        <h6>Doesn't have an account? Sign up</h6>
        <b-button
          class="buttonLogSign btn-block"
          variant="light"
          type="button"
          @click=";(isShown = !isShown), onReset()"
          >Sign up</b-button
        >
      </b-card>
      <b-card class="align-content-center" v-show="isShown">
        <b-alert variant="success" v-bind:show="alerts">{{ isMsg }}</b-alert>
        <b-alert variant="danger" v-bind:show="alertError">{{
          isMsgError
        }}</b-alert>
        <h3>Sign up</h3>
        <br />
        <form @submit.prevent="addUser" @reset.prevent="onResetSignUp">
          <b-input-group>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>
            <b-form-input
              type="text"
              v-model="formSignUp.user_name"
              placeholder="User name..."
              required
            ></b-form-input>
          </b-input-group>
          <br />
          <b-input-group>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="far fa-envelope"></i>
              </span>
            </div>
            <b-form-input
              type="email"
              v-model="formSignUp.user_email"
              placeholder="Email..."
              required
            ></b-form-input>
          </b-input-group>
          <br />
          <b-input-group>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <b-form-input
              type="password"
              v-model="formSignUp.user_password"
              placeholder="Password..."
              required
            ></b-form-input>
          </b-input-group>
          <br />
          <b-button
            :disabled="isDisabled"
            class="btn-block"
            variant="primary"
            @click="addUser()"
            >Sign up</b-button
          >
          <br />
          <b-button class="btn-block" type="reset" @click="onResetSignUp()"
            >Reset</b-button
          >
        </form>
        <hr />
        <h6>Already have an account? Log in</h6>
        <b-button
          class="buttonLogSign btn-block"
          variant="light"
          type="button"
          @click=";(isShown = !isShown), onResetSignUp()"
          >Log in</b-button
        >
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      formSignUp: {
        user_email: '',
        user_password: '',
        user_name: ''
      },
      isShown: false,
      alerts: false,
      isMsg: '',
      alertError: false,
      isMsgError: ''
    }
  },
  computed: {
    isDisabled() {
      return (
        this.formSignUp.user_email <= 0 ||
        this.formSignUp.user_password <= 0 ||
        this.formSignUp.user_name <= 0
      )
    },
    isDisabled2() {
      return this.form.user_email <= 0 || this.form.user_password <= 0
    }
  },
  methods: {
    ...mapActions(['login', 'addUsers']),
    onSubmit() {
      this.login(this.form)
        .then((result) => {
          this.alerts = true
          this.isMsg = result
          this.alertError = false
          this.$router.push('/')
        })
        .catch((error) => {
          this.alertError = true
          this.isMsgError = error
          this.alerts = false
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
      this.alerts = false
      this.alertError = false
    },
    onResetSignUp() {
      this.formSignUp = {
        user_email: '',
        user_password: '',
        user_name: ''
      }
      this.alerts = false
      this.alertError = false
    },
    addUser() {
      this.addUsers(this.formSignUp)
        .then((response) => {
          this.alerts = true
          this.isMsg = response.msg
          this.alertError = false
          this.formSignUp = {
            user_email: '',
            user_password: '',
            user_name: ''
          }
        })
        .catch((error) => {
          this.alertError = true
          this.isMsgError = error.data.msg
          this.alerts = false
        })
    }
  }
}
</script>

<style scoped>
.buttonLogSign {
  font-weight: bold;
}
.card {
  margin-top: auto;
  margin-bottom: auto;
  height: auto;
  text-align: center;
  width: 400px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
}
.card-body {
  background: whitesmoke;
}
.container-fluid {
  height: 700px;
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
