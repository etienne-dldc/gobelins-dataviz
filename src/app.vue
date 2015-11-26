<template lang="html">
  <loader v-if="displayLoader"></loader>
  <graph></graph>
</template>

<script>
import Graph from './components/graph.vue'
import Loader from './components/loader.vue'

export default {
  data () {
    return {
      displayLoader: true
    };
  },
  components: {
    Graph,
    Loader
  },
  events: {
    "loader-off": function () {
      this.displayLoader = false;
    }
  }
}
</script>

<style lang="css">

</style>
