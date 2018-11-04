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
    <infos v-show="displayInfos" :data="infosData" @close="closeInfos" transition="intro"></infos>
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
import Graph from './components/Graph.vue';
import Loader from './components/Loader.vue';
import Sidebar from './components/Sidebar.vue';
import AppTitle from './components/AppTitle.vue';
import Details from './components/Details.vue';
import Intro from './components/Intro.vue';
import Infos from './components/Infos.vue';
import { Howl } from 'howler';

export default {
  components: {
    Graph,
    Loader,
    Sidebar,
    AppTitle,
    Details,
    Intro,
    Infos,
  },
  data() {
    return {
      intro: true,
      main: false,
      sound: false,
      title: false,
      infosData: {},
      pointerCursor: false,
      displayLoader: false,
      displayInfos: false,
      details: { params: {}, infos: {} },
      showDetails: false,
      paramsData: {
        realGeoloc: false,
        hauteur: {
          name: "Rayon d'action",
          slug: 'hauteur',
          multiplier: 0.001,
          color: 0xffffff,
          user_multiplier: 1,
          infos: {
            title: 'La Hauteur',
            description:
              'La Hauteur est également un facteur majeur de la solitude d’un arbre. S’il se tient plus bas que ses congénères, la frustration générée impacte sur son ressenti. Plus réservé et moins ouvert sur le monde, l’arbre s’enferme alors dans la solitude. Au contraire, s’il est plus haut des autres, l’arbre s’ouvre sur le monde, sa vision est agrandie devient plus social et heureux.',
          },
        },
        leafs: {
          arbres_align_dist: {
            slug: 'arbres_align_dist',
            name: "Arbres d'alignement",
            multiplier: 1,
            color: 0x16f1d4,
            colorLegend: '#16f1d4',
            user_multiplier: 1,
            max: 104025,
            display: true,
            infos: {
              title: "Les Arbres d'alignement",
              description:
                'Lorem ipsum dolor sit amet, tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat, officia deserunt mollit anim id est laborum.',
            },
          },
          bancs_dist: {
            slug: 'bancs_dist',
            name: 'Bancs',
            color: 0x18f277,
            colorLegend: '#18f277',
            max: 11581,
            multiplier: 1,
            user_multiplier: 1,
            display: true,
            infos: {
              title: 'Les Bancs',
              description:
                'Les bancs publics redonnent à l’arbre le goût à la vie. Les bancs publiques sont des lieux de rencontre, de méditation, ou simplement de vie. L’arbre ressent alors cette vie près de lui et se sent moins seul.',
            },
          },
          poteaux_bois_dist: {
            slug: 'poteaux_bois_dist',
            name: 'Poteaux en Bois',
            multiplier: 1,
            color: 0x1dacdd,
            colorLegend: '#1dacdd',
            user_multiplier: 0.5,
            max: 137,
            display: true,
            infos: {
              title: 'Les Poteaux en bois',
              description:
                'L’absence de poteaux en bois est importante pour le bien-être et le moral de l’arbre. En effet, l’arbre est plus enclin à la dépression s’il s’aperçoit qu’un des congénères morts ( un poteau en bois donc) se trouve à proximité. L’arbre peut alors se recroqueviller sur lui-même perdu dans ses pensées et souvenirs négatifs.',
            },
          },
        },
      },
    };
  },
  ready() {
    this.music = new Howl({
      urls: ['music/ambient.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.5,
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
    },
    playSound() {
      this.sound = true;
      this.music.pause();
      this.music.play();
      this.$broadcast('sound-status', this.sound);
    },
    closeInfos() {
      this.displayInfos = false;
    },
  },
  events: {
    'loader-off': function() {
      this.displayLoader = false;
    },
    'params-update': function(params) {
      this.$broadcast('update-graph');
    },
    'tree-hover': function(infos, params) {
      this.pointerCursor = true;
      clearTimeout(this.hideDetailTimer);
      this.details = {
        infos,
        params,
      };
      this.showDetails = true;
    },
    'tree-unhover': function() {
      this.pointerCursor = false;
      this.hideDetailTimer = setTimeout(() => {
        this.showDetails = false;
      }, 1000);
    },
    'intro-start': function() {
      this.playSound();
    },
    'intro-end': function() {
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
      this.playSound();
    },
    'show-infos': function(infos) {
      this.infosData = infos;
      this.displayInfos = true;
    },
  },
};
</script>
