<template lang="html">
  <div class="app-container">
    <loader v-if="displayLoader" transition="fade"></loader>
    <graph></graph>
  </div>
</template>

<style lang="sass">
  html, body{
    height: 100%;
    background: black;
  }

  @import "./styles/transitions.scss";

  .app-container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

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
