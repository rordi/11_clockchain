
<template>
  <div>
    <img src="~assets/logo.png" alt="Clockchain" width="55" height="55" style="margin-top: -6px;">
    <div class="nav">
      <el-button @click="logout" type="info" size="small" style="float: right;">Logout</el-button>
    </div>

    <div class="container">
      <h1>Willkommen, {{ user.firstname }} {{ user.lastname }}</h1>

      <Balance/>

      <Transfer/>

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


      <div class="marketplace">
        <h1>Marktplatz</h1>
        <div v-for="mission in openMissions">
          <Mission v-bind:mission="mission"/>
        </div>
        <div v-if="!openMissions || openMissions.length === 0">
          <em>Es sind im Moment keine Anfragen offen.</em>
        </div>
      </div>

      <hr/>

      <div class="marketplace">
        <h4>Provisorisch gebuchte Leistungen</h4>
        <div v-for="mission in bookedMissions">
          <Mission v-bind:mission="mission"/>
        </div>
      </div>

      <div class="marketplace">
        <h4>Gebuchte Leistungen</h4>
        <div v-for="mission in confirmedMissions">
          <Mission v-bind:mission="mission"/>
        </div>
      </div>

      <hr/>

      <div class="marketplace">
        <h4>Zu bestätigende Einsätze</h4>
        <div v-for="mission in pendingAcceptanceMissions">
          <Mission v-bind:mission="mission"/>
        </div>
      </div>

      <div class="marketplace">
        <h4>Bestätigte Einsätze</h4>
        <div v-for="mission in acceptedMissions">
          <Mission v-bind:mission="mission"/>
        </div>
      </div>

      <hr/>

    </div>
  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import Balance from './Balance.vue'
  import Mission from './Mission.vue'
  import Transfer from './Transfer.vue'

  export default {
    components: {
      ElCol,
      ElRow,
      Balance,
      Mission,
      Transfer
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
      }
    },
    created () {
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
    margin-top: 0;
    padding-top: 0;
  }

  pre {
    font-family: monospace;
    font-size: 0.9em;
    display: inline;
  }

  .marketplace {
    margin-top: 3em;
  }

</style>
