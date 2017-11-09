<template>
  <el-button @click="transfer" type="success" size="small" v-loading="isBusy">Gutschrift bestätigen</el-button>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: 'Transfer',
  props: ['mission'],

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
            this.$notie.alert('error', 'Es gab ein Fehler: ' + response.body.error.message)
            return
          }
          this.$notie.alert('success', 'Zeitgutschrift erfolgreich.')
          // update mission status to 'past'
          this.$store.dispatch('statusChange', { mission: this.mission, status: 'past' })
        })
        .catch(response => {
          console.error(response)
          this.$notie.alert('error', 'Fehler beim Auslösen der Zeitgutschrift.')
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
