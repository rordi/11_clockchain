
<template>
  <div>
    <h1>Wilkommen, {{ firstname }}</h1>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
        'cantons'
      ]),
      ...mapGetters([
        'firstname'
      ])
    }
  }
</script>
