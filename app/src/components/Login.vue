<template>
  <div>
    <h1>Clockchain</h1>
    <p>
      <router-link to="/home">Test home</router-link>
    </p>

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
    methods: {
      login (event) {
        if (this.username !== '' && this.password !== '') {
          this.$store.dispatch('login', { username: this.username, password: this.password })
            .then((user) => {
              if (this.redirect) {
                this.$router.push(this.redirect)
              }
              this.$router.push('/home')
            }).catch(function () {
              this.$notie.alert('error', 'Fehler beim Einloggen.')
            })
        } else {
          this.$notie.alert('error', 'Fehler beim Einloggen.')
        }
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
