
<template>
  <div>
    <img src="~assets/logo.png" alt="Clockchain" width="55" height="55" style="margin-top: -6px;">
    <div class="nav">
      <el-button @click="logout" type="info" size="small" style="float: right;">Logout</el-button>
    </div>

    <div class="container">
      <h1>Willkommen, {{ user.firstname }} {{ user.lastname }}</h1>

      <Balance/>

      <el-row>
        <el-col :span="6">
          <el-tag size="small" type="warning">
            Wallet
          </el-tag>
        </el-col>
        <el-col :span="18">
          <pre>{{ user.wallet }}</pre>
        </el-col>
      </el-row>

      <div class="marketplace section">
        <h1>Marktplatz</h1>
        <div v-for="mission in openMissions" :key="mission.id">
          <Mission :mission="mission" context="open"/>
        </div>
        <div v-if="openMissions.length === 0">
          <em>Es sind im Moment keine Anfragen offen.</em>
        </div>
      </div>

      <hr/>

      <div class="marketplace section">
        <h1>Meine Einsätze</h1>
        <div v-if="!hasMissions">
          <em>Du hast noch keine Einsätze.</em>
        </div>
      </div>

      <div class="marketplace" v-if="bookedMissions.length > 0">
        <h4>Provisorisch gebuchte Leistungen</h4>
        <div v-for="mission in bookedMissions" :key="mission.id">
          <Mission :mission="mission" context="booked" />
        </div>
      </div>

      <div class="marketplace" v-if="confirmedMissions.length > 0">
        <h4>Gebuchte Leistungen</h4>
        <div v-for="mission in confirmedMissions" :key="mission.id">
          <Mission :mission="mission" context="confirmed" />
        </div>
      </div>

      <div class="marketplace" v-if="pendingAcceptanceMissions.length > 0">
        <h4>Zu bestätigende Einsätze</h4>
        <div v-for="mission in pendingAcceptanceMissions" :key="mission.id">
          <Mission :mission="mission" context="acceptance" />
        </div>
      </div>

      <div class="marketplace" v-if="acceptedMissions.length > 0">
        <h4>Bestätigte Einsätze</h4>
        <div v-for="mission in acceptedMissions" :key="mission.id">
          <Mission :mission="mission" context="claimable" />
        </div>
      </div>

      <div class="marketplace" v-if="pendingClaimConfirmationMissions.length > 0">
        <h4>Anfragen Zeitgutschrift</h4>
        <div v-for="mission in pendingClaimConfirmationMissions" :key="mission.id">
          <Mission :mission="mission" context="claimed" />
        </div>
      </div>

      <div class="marketplace" v-if="pastMissions.length > 0">
        <h4>Vergangene Einsätze</h4>
        <div v-for="mission in pastMissions" :key="mission.id">
          <Mission :mission="mission" context="past" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import Balance from './Balance.vue'
  import Mission from './Mission.vue'

  export default {
    name: 'Home',
    components: {
      ElCol,
      ElRow,
      Balance,
      Mission
    },

    data () {
      return {
      }
    },

    computed: {
      user: function () {
        return this.$store.getters.user
      },
      openMissions: function () {
        return this.$store.getters.openMissions
      },
      bookedMissions: function () {
        return this.$store.getters.bookedMissions
      },
      pendingAcceptanceMissions: function () {
        return this.$store.getters.pendingAcceptanceMissions
      },
      acceptedMissions: function () {
        return this.$store.getters.acceptedMissions
      },
      confirmedMissions: function () {
        return this.$store.getters.confirmedMissions
      },
      claimedMissions: function () {
        return this.$store.getters.claimedMissions
      },
      pendingClaimConfirmationMissions: function () {
        return this.$store.getters.pendingClaimConfirmationMissions
      },
      pastMissions: function () {
        return this.$store.getters.pastMissions
      },
      hasMissions: function () {
        let counts = [
          this.bookedMissions.length,
          this.pendingAcceptanceMissions.length,
          this.acceptedMissions.length,
          this.confirmedMissions.length,
          this.claimedMissions.length,
          this.pendingClaimConfirmationMissions.length,
          this.pastMissions.length
        ]
        let sum = counts.reduce((a, b) => { return a + b })
        return sum > 0
      }
    },
    created () {
      this.$store.dispatch('setAppStateRef', this.$db.ref('appState'))
    },
    methods: {
      logout (event) {
        this.$store.commit('LOGOUT_USER')
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped>

  .nav {
    display: block;
    clear: both;

    &:after {
     clear: both;
    }
  }


  h1 {
    font-size: 1.3em;
    margin: 0 0 1em 0;
    padding-top: 0;
  }

  h4 {
    font-size: 0.8em;
    margin: 0 0 0.8em 0;
    padding-top: 0;
  }

  pre {
    font-family: monospace;
    font-size: 0.9em;
    display: inline;
  }

  .marketplace {
    margin-top: 1em;
  }

  .section {
    margin: 2em 0;

  }

</style>
