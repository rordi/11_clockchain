<template>
  <div class="balance" v-loading="isBusy" @click="refresh()">
    <h2 class="balance__label">Dein Zeitguthaben</h2>
    <div class="balance__wrapper">
      <span class="balance__value">{{ balance }}</span>
      <span class="balance__unit">STD</span>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: 'Balance',

  methods: {
    refresh () {
      this.isBusy = true
      this.$http.get(this.user.balanceUrl)
        .then(response => {
          console.log(response)
          this.balance = parseInt(response.body.result, 16)
        })
        .catch(console.warn)
        .then(() => (this.isBusy = false))
    }
  },

  created () {
    this.refresh()
    setInterval(this.refresh, 10000)
  },

  destroyed () {
    clearInterval(this.refresh)
  },

  computed: Vuex.mapState(['appState', 'user']),

  data () {
    return {
      isBusy: false,
      balance: ''
    }
  }
}
</script>

<style lang="css" scoped>

  .balance {
    background-color: #eaeaea;
    padding: 0.25rem 1rem;
    border-radius: 4px;
  }

  .balance__label {
    text-transform: uppercase;
    font-size: 0.7rem;
  }

  .balance__wrapper {
    text-align: center;
  }

  .balance__value {
    font-size: 3rem;
    font-weight: bold;
  }
  .balance__unit {
    text-align: center;
    font-size: 0.7rem;
    text-transform: uppercase;
    vertical-align: top;
    line-height: 3rem;
  }

</style>
