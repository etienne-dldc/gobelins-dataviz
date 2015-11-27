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

  .group{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .toggle-sound{
    position: fixed;
    top: 35px;
    right: 27px;
    height: 25px;
    width: 25px;
    cursor: pointer;
    z-index: 3000;
    background: url('styles/images/sound.svg') no-repeat;
  }

  .toggle-sound.no-sound{
    background: url('styles/images/nosound.svg') no-repeat;
  }

  .pointer-cursor canvas{
    cursor: pointer;
  }
</style>

<template lang="html">
  <div :class="{'app-container':true, 'pointer-cursor': pointerCursor }">
    <span class="toggle-sound" :class="{'no-sound': !sound}" @click="toggleSound"></span>
    <loader v-if="displayLoader" transition="fade"></loader>
    <intro v-if="intro" transition="intro"></intro>
    <graph v-if="main" :params-data="paramsData"></graph>
    <sidebar v-if="main" :params-data="paramsData"></sidebar>
    <app-title v-if="title" transition="title"></app-title>
    <details v-show="main && showDetails" :data="details" :params-data="paramsData" transition="details"></details>
  </div>
</template>

<script>
import Graph from './components/Graph.vue'
import Loader from './components/Loader.vue'
import Sidebar from './components/Sidebar.vue'
import AppTitle from './components/AppTitle.vue'
import Details from './components/Details.vue'
import Intro from './components/Intro.vue'
import { Howl } from 'howler';

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
      main: false,
      sound: true,
      title: false,
      pointerCursor: false,
      displayLoader: false,
      details: { params: {}, infos: {} },
      showDetails: false,
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

    this.music = new Howl({
      urls: ['music/ambient.mp3'],
      autoplay: true,
      loop: true,
      volume: 0.5
    });

  },
  methods: {
    toggleSound() {
      this.sound = !this.sound;
      if (this.sound) {
        this.music.play();
      } else {
        this.music.pause();
      }
      this.$broadcast('sound-status', this.sound);
    }
  },
  events: {
    'loader-off': function () {
      this.displayLoader = false;
    },
    'params-update': function (params) {
      this.$broadcast('update-graph');
    },
    'tree-hover': function (infos, params) {
      this.pointerCursor = true;
      clearTimeout(this.hideDetailTimer);
      this.details = {
        infos,
        params
      };
      this.showDetails = true;
    },
    'tree-unhover': function () {
      this.pointerCursor = false;
      this.hideDetailTimer = setTimeout( () => {
        this.showDetails = false;
      }, 1000);
    },
    'intro-end': function () {
      this.main = true;
      setTimeout(() => {
        this.intro = false;
      }, 300);
      setTimeout(() => {
        this.$broadcast('show-sidebar');
      }, 600);
      setTimeout(() => {
        this.title = true;
      }, 600);
    }
  }
}
</script>
