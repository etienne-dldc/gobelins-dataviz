<template lang="html">
  <div class="app-container">
    <loader v-if="displayLoader" transition="fade"></loader>
    <graph :params-data="paramsData"></graph>
    <sidebar :params-data="paramsData"></sidebar>
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
      displayLoader: true,
      paramsData: {
        realGeoloc: false,
  			hauteur: {
          name: 'Rayon d\'action',
          slug: 'hauteur',
  				multiplier: 0.001,
  				color: 0xffffff,
  				user_multiplier: 1
  			},
  			leafs: {
          arbres_align_dist: {
            slug: 'arbres_align_dist',
            name: 'Arbres',
    				multiplier: 1,
            color: 0x16f1d4,
    				colorLegend: '#16f1d4',
    				user_multiplier: 1,
    				max: 104025,
    				display: true
    			},
    			bancs_dist: {
            slug: 'bancs_dist',
            name: 'Bancs',
    				color: 0x18f277,
    				colorLegend: '#18f277',
    				max: 11581,
    				multiplier: 1,
    				user_multiplier: 1,
    				display: true
    			},
    			poteaux_bois_dist: {
            slug: 'poteaux_bois_dist',
            name: 'Poteaux en Bois',
    				multiplier: 1,
    				color: 0x1dacdd,
    				colorLegend: '#1dacdd',
    				user_multiplier: 0.5,
    				max: 137,
    				display: true
    			}
        }
  		}
    };
  },
  components: {
    Graph,
    Loader,
    Sidebar
  },
  events: {
    'loader-off': function () {
      this.displayLoader = false;
    },
    'params-update': function (params) {
      this.$broadcast('update-graph');
    }
  }
}
</script>
