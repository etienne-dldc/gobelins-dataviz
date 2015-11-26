<template lang="html">
  <div class="app-container">
    <loader v-if="displayLoader" transition="fade"></loader>
    <graph></graph>
    <sidebar></sidebar>
  </div>
</template>

<style lang="sass">
  html, body{
    height: 100%;
    background: black;
  }

  @import "./styles/transitions.scss";
  @import "./styles/fonts.scss";

  .app-container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

<script>
import Graph from './components/Graph.vue'
import Loader from './components/Loader.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  data () {
    return {
      displayLoader: true
    };
  },
  components: {
    Graph,
    Loader,
    Sidebar
  },
  events: {
    "loader-off": function () {
      this.displayLoader = false;
    }
  }
}
</script>
