<template>
  <div class="mission">
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
        <!-- consumer books a mission-->
        <span v-if="mission.status && mission.status === 'open'" @click="bookMission">
          <el-button type="success" size="small" class="book">
            provisorisch Buchen
          </el-button>
        </span>

        <!-- supplier confirms a booked mission-->
        <span v-if="mission.status && mission.status === 'booked'" @click="acceptMission">
          <el-button type="success" size="small" class="book">
            Bestätigen
          </el-button>
        </span>

        <!-- supplier claims a confirmed mission-->
        <span v-if="mission.status && mission.status === 'accepted'" @click="claimMission">
          <el-button type="success" size="small" class="book">
            Gutschrift anfragen
          </el-button>
        </span>

        <!-- consumer confirms claimed mission-->
        <span v-if="mission.status && mission.status === 'accepted'">
          <el-button type="success" size="small" class="book">
            Gutschrift bestätigen
          </el-button>
        </span>

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-tag v-for="tag in mission.tags" size="mini" class="tag">{{ tag }}</el-tag>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElRow from 'element-ui/packages/row/src/row'
import ElCol from 'element-ui/packages/col/src/col'

export default {
  name: 'Mission',
  props: ['mission'],
  components: {
    ElCol,
    ElRow
  },
  data () {
    return {
      mission: {}
    }
  },
  methods: {
    bookMission: function () {
      let notie = this.$notie
      this.$store.dispatch('statusChange', { mission: this.mission, status: 'booked' })
        .then((res) => {
          notie.alert('success', 'Einsatz provisorisch gebucht.')
        }).catch(function () {
          notie.alert('error', 'Fehler beim Speichern.')
        })
    },
    acceptMission: function () {
      let notie = this.$notie
      this.$store.dispatch('statusChange', { mission: this.mission, status: 'accepted' })
        .then((res) => {
          notie.alert('success', 'Einsatz akzeptiert.')
        }).catch(function () {
          notie.alert('error', 'Fehler beim Speichern.')
        })
    },
    claimMission: function () {
      let notie = this.$notie
      this.$store.dispatch('statusChange', { mission: this.mission, status: 'claimed' })
        .then((res) => {
          notie.alert('success', 'Zeitgutschrift angefragt')
        }).catch(function () {
          notie.alert('error', 'Fehler beim Speichern.')
        })
    }
  }
}
</script>

<style lang="css" scoped>

  .mission {
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
