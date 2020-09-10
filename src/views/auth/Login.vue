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
        <b-alert v-bind:show="alert">{{ isMsg }}</b-alert>
        <h3>Please Login</h3>
        <br />
        <form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-input-group>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="far fa-envelope"></i>
              </span>
            </div>
            <b-form-input type="email" v-model="form.user_email" placeholder="Email..." required></b-form-input>
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
          <b-button class="btn-block" variant="primary" @click="onSubmit()">Log in</b-button>
          <br />
          <b-button class="btn-block" type="reset">Reset</b-button>
        </form>
        <hr />
        <h6>Doesn't have an account? Sign up</h6>
        <b-button
          class="buttonLogSign btn-block"
          variant="light"
          type="button"
          @click="isShown=!isShown"
        >Sign up</b-button>
      </b-card>
      <b-card class="align-content-center" v-show="isShown">
        <b-alert v-bind:show="alert">{{ isMsg }}</b-alert>
        <h3>Sign up</h3>
        <br />
        <form>
          <b-input-group>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>
            <b-form-input type="text" v-model="formSignUp.user_name" placeholder="User name..."></b-form-input>
          </b-input-group>
          <br />
          <b-input-group>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="far fa-envelope"></i>
              </span>
            </div>
            <b-form-input type="email" v-model="formSignUp.user_email" placeholder="Email..."></b-form-input>
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
            ></b-form-input>
          </b-input-group>
          <br />
          <b-button class="btn-block" variant="primary" @click="addUser()">Sign up</b-button>
          <br />
          <b-button class="btn-block" type="reset" @click="onResetSignUp()">Reset</b-button>
        </form>
        <hr />
        <h6>Already have an account? Log in</h6>
        <b-button
          class="buttonLogSign btn-block"
          variant="light"
          type="button"
          @click="isShown=!isShown, onResetSignUp()"
        >Log in</b-button>
      </b-card>
    </div>
    <!-- [1] [2] -->
    <!-- <h3>{{ dataName }}</h3> -->
    <!-- [3] -->
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      alert: false,
      isMsg: ''
    }
  },
  computed: {
    //   [1]
    // dataName() {
    //   return this.$store.state.name
    // }
    // [2]
    // ...mapState({ dataName: 'name' })
    // [3]
    ...mapState(['name'])
  },
  methods: {
    ...mapActions(['login', 'addUsers']),
    onSubmit() {
      this.login(this.form)
        .then((result) => {
          console.log(result)
          this.$router.push('/')
        })
        .catch((error) => {
          // this.alert = true
          // this.isMsg = error.data.msg
          alert(error.data.msg)
          // console.log(error)
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
      this.alert = false
    },
    onResetSignUp() {
      this.formSignUp = {
        user_email: '',
        user_password: '',
        user_name: ''
      }
      this.alert = false
    },
    addUser() {
      this.addUsers(this.formSignUp)
        .then((response) => {
          this.alert = true
          this.isMsg = response.msg
          this.addUsers()
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
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
