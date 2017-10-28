<template>
  <div class="hero-yoga-studio apphero">
    <div class="container">
      <div class="row">
        <div class="text-center col-sm-12">
          <div class="register">
            <a href="/registration">Konto erstellen</a>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 text-center">
          <a href="/">
            <!--<img class="logo" alt="Teacherflow" src="~assets/logo.png" height="200">-->
          </a>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4 text-center">

          <form @submit.prevent='login' class="login-form">

            <div class="form-group">
              <input class="form-control" name="username" placeholder="E-Mail" type="text" v-model="username" required>
            </div>

            <div class="form-group">
              <input class="form-control" name="password" placeholder="Passwort" type="password" v-model="password" required>
            </div>

            <p class="error" v-if="loginFailed">{{ errorMsg }}</p>
            <p class="error" v-else-if="error">
              <span v-if="errorMsg">{{ errorMsg }}</span>
              <span v-else>
                Bitte versuche es nochmals, oder kontaktiere uns über
                <a href="mailto:info@teacherflow.ch">info@teacherflow.ch</a>
              </span>
            </p>
            <p class="success" v-else-if="logout">Du wurdest aus der App abgemeldet</p>

            <div class="form-group">
              <tf-submit-button class="login btn btn-primary">Anmelden</tf-submit-button>
            </div>

          </form>
        </div>
      </div>

      <div class="row justify-content-center pb-5">
        <div class="col-md-6 col-lg-4 text-center">
            <div class="forgot text-center mt-5">
              <a href="/reset/request">Passwort vergessen?</a>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: ['redirect', 'error', 'logout'],
    data () {
      return {
        username: '',
        password: '',
        loginFailed: false,
        errorMsg: 'Anmeldung fehlgeschlagen. Bitte versuche es nochmals.'
      }
    },
    methods: {
      login (event) {
        this.loginFailed = false

        this.$store.dispatch('login', { username: this.username, password: this.password })
          .then((user) => {
            if (this.redirect) {
              this.$router.push(this.redirect)
            }
            switch (user.type) {
              case 2: // Teacher
                if (user.has_profile_completed) {
                  this.$router.push('/')
                } else {
                  this.$router.push('/profile')
                }
                break

              case 1: // Studio
                if (user.has_studios) {
                  this.$router.push('/studio')
                } else {
                  this.$router.push('/studio/profile')
                }
                break

              case 9: // Admin
                this.$router.push('/admin')
                break

              default:
                this.loginFailed = true
            }
          }).catch((err) => {
            this.loginFailed = true
            if (err.message) {
              this.errorMsg = err.message
            }
          })
      }
    }
  }
</script>

<style lang ="scss" scoped>

</style>
