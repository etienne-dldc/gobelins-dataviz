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

<template lang="html">
  <div class="app-container">
    <loader v-if="displayLoader" transition="fade"></loader>
    <template v-if="intro">
      <intro></intro>
    </template>
    <template v-else>
      <graph :params-data="paramsData"></graph>
      <sidebar :params-data="paramsData"></sidebar>
      <app-title></app-title>
      <details v-if="details" :data="details" transition="details"></details>
    </template>
  </div>
</template>

<script>
import Graph from './components/Graph.vue'
import Loader from './components/Loader.vue'
import Sidebar from './components/Sidebar.vue'
import AppTitle from './components/AppTitle.vue'
import Details from './components/Details.vue'
import Intro from './components/Intro.vue'

export default {
  components: {
    Graph,
    Loader,
    Sidebar,
    AppTitle,
    Details,
    Intro
  },
  data () {
    return {
      intro: true,
      displayLoader: true,
      details: false,
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
  ready() {

  },
  events: {
    'loader-off': function () {
      this.displayLoader = false;
    },
    'params-update': function (params) {
      this.$broadcast('update-graph');
    },
    'tree-hover': function (tree) {
      clearTimeout(this.hideDetailTimer);
      this.details = tree;
    },
    'tree-unhover': function () {
      this.hideDetailTimer = setTimeout( () => {
        this.details = false;
      }, 1000);
    }
  }
}
</script>
