
<template>
  <div>
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

      <!--<div class="booked" v-if="appState.missions.booked.length > 0">-->
        <!--<h1>Buchungsanfragen</h1>-->
      <!--</div>-->

      <!--<div class="accepted" v-if="appState.missions.accepted.length > 0">-->
        <!--<h1>Bestätigte Buchungen</h1>-->
      <!--</div>-->

      <!--<div class="claimed" v-if="appState.missions.claimed.length > 0">-->
        <!--<h1>Zeitgutschrift angefordert</h1>-->
      <!--</div>-->

      <div class="marketplace">
        <h1>Marktplatz</h1>
        <div v-for="mission in openMissions" class="item">
          <el-row>
            <el-col :span="18">
              <h4>{{ mission.title}}</h4>
              <div style="clear: both">
                <small>
                  {{ mission.description }}
                </small>
              </div>
            </el-col>
            <el-col :span="6">
              <el-button type="success" size="small" class="book">
                Buchen
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-tag v-for="tag in mission.tags" size="mini" class="tag">{{ tag }}</el-tag>
            </el-col>
          </el-row>
        </div>
        <div v-if="!openMissions || openMissions.length === 0">
          <em>Es sind im Moment keine Anfragen offen.</em>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import Balance from './Balance.vue'
  import Transfer from './Transfer.vue'

  export default {
    components: {
      ElCol,
      ElRow,
      Balance,
      Transfer
    },
    data () {
      return {
        openMissions: this.$store.getters.appState.openMissions
      }
    },
    computed: Vuex.mapState(['user']),
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

  .item {
    min-height: 60px;
    margin-bottom: 1em;
    padding: 0.5em 1em;
    border: 1px solid #e5e5e5;
    background: #fbfbfb;
    border-radius: 6px;

    h4 {
      margin-top: 0;
      float: left;
    }
  }

  .book {
    float: right;
  }

  .tag {
    margin: 0.6em 1em 0 0;
  }

</style>
