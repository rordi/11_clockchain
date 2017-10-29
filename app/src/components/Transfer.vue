<template>
  <div class="transfer" v-loading="isBusy">
    <el-button @click="transfer" type="success">Transfer</el-button>
    <div>{{ msg }}</div>
    <div class="error">{{ details }}</div>
  </div>
</template>

<script>
import Vuex from 'vuex'
export default {

  name: 'Transfer',

  data () {
    return {
      isBusy: false,
      msg: '',
      details: ''
    }
  },

  computed: Vuex.mapState(['appState', 'transferUrl']),

  methods: {
    log () { console.log(this.appState.transferUrl) },
    transfer () {
      console.log('starting transfer')
      this.details = ''
      this.msg = ''
      this.isBusy = true
      this.$http.get(this.appState.transferUrl)
        .then(response => {
          console.log(response)
          if (response.body && response.body.error) {
            this.msg = 'There was an error!'
            this.details = response.body.error.message
            return
          }
          this.msg = 'Transferred time!'
          this.details = ''
        })
        .catch(response => {
          console.error(response)
          this.msg = 'There was an error!'
        })
        .then(() => {
          this.isBusy = false
        })
    }
  }

}
</script>

<style lang="css" scoped>
.transfer {
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #eaeaea;
  text-align: center;
}

.error {
  color: red;
}
</style>
