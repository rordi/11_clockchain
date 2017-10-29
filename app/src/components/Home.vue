
<template>
  <div>
    <div class="nav">
      <el-button @click="logout" type="info" size="small" style="float: right;">Logout</el-button>
    </div>

    <div class="container">
      <h1>Wilkommen, {{ user.firstname }}</h1>


      <el-row>
        <el-col :span="6">
          <el-tag size="small" type="warning">
            Name
          </el-tag>
        </el-col>
        <el-col :span="18">
          <span>{{ user.firstname }} {{ user.lastname }}</span>
        </el-col>
      </el-row>

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
        <h3>Marktplatz</h3>
        <el-row v-for="mission in appState.missions.open" class="item">
          <el-col :span="18">
            {{ mission.description }}
          </el-col>
          <el-col :span="6">
            <el-button plain type="success" size="small" class="book">
              Buchen
            </el-button>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    components: {
      ElCol,
      ElRow
    },
    data () {
      return {
      }
    },
    computed: Vuex.mapState(['appState', 'user']),
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
    border-radius: 3px;
  }

  .book {
    float: right;
  }

</style>
