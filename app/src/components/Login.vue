<template>
  <div class="container">
    <h1>Clockchain</h1>
    <el-row>
      <el-col>
        <el-select v-model="username" placeholder="E-Mail" style="display: block;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-input type="password" placeholder="Passwort" v-model="password"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="primary" icon="el-icon-check" v-on:click="login">
          Login
        </el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Vuex from 'vuex'

  export default {
    props: ['redirect', 'error', 'logout'],
    data () {
      return {
        options: [{
          value: 'supplier@test.ch',
          label: 'supplier@test.ch'
        }, {
          value: 'consumer@test.ch',
          label: 'consumer@test.ch '
        }],
        username: '',
        password: ''
      }
    },
    computed: Vuex.mapState(['users']),
    created () {
      this.$store.dispatch('serUsersRef', this.$db.ref('users'))
    },
    methods: {
      login (event) {
        let notie = this.$notie
        if (this.username !== '' && this.password !== '') {
          this.$store.dispatch('login', { username: this.username, password: this.password })
            .then((user) => {
              if (this.redirect) {
                this.$router.push(this.redirect)
              }
              this.$router.push('/home')
            }).catch(function () {
              notie.alert('error', 'Fehler beim Einloggen.')
            })
        } else {
          notie.alert('error', 'Fehler beim Einloggen.')
        }
      }
    }
  }
</script>

<style scoped>

  .container {
    text-align: center;
  }

</style>
