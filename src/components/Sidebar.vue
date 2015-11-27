<style lang="sass?outputStyle=expanded" scoped>

  @import "../styles/variables.scss";

  .sidebar{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
		width : 385px;
    background: $color_main;
    opacity : 0.94;
    -webkit-transition-duration: .3s;
            transition-duration: .3s;

    .relative-pos{
      position: relative;
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .scroll-content{
      position: absolute;
      top: 60px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;

  		padding: 35px;
  		padding-left: 40px;
    }

    h3{
      color : #808080;
  		text-transform: uppercase;
  		font-family : 'cpcompanyregular' sans-serif;
      font-size: 16px;
      padding-top: 0px;
      padding-bottom: 12px;
      letter-spacing: 3px;
      margin: 0;
    }

    hr{
      //width : 250px;
  		background-color : #303030;
      height : 1px;
      border: none;
    }

    p.legende-info{
      font-family : ‘Helvetica-Neue’, sans-serif;
      font-weight: 300;
  		font-size : 14px;
      line-height: 1.6;
  		color : #666666;
  		margin-top : 15px;
  		margin-bottom : 20px;
    }

    .buttons{
      padding-top: 35px;
      padding-left: 35px;
    }

    .toggle-menu{
      -webkit-transition-duration: .3s;
              transition-duration: .3s;
      height: 20px;
      width: 20px;
      left: 0px;
      top: 0px;
      cursor: pointer;
      display: inline-block;
      position: relative;
      background: url('../styles/images/menu.svg');
    }

    .hauteurdata{
      padding-left: 112px;
    }

    .distancereal{
      font-family: 'cpcompanyregular' sans-serif;
      color: #707070;
      font-size:13px;
      margin-bottom: 10px;
      padding: 20px;
      text-transform:uppercase;
    }

    .type{
      color : #8a8a8a;
      text-transform: uppercase;
      font-family : ‘Cpcompany’, sans-serif;
      letter-spacing: 1px;
      font-size : 14px;
      margin: 45px 0 20px 0;
    }

    .type{
      color : #8a8a8a;
      text-transform: uppercase;
      font-family : 'cpcompanyregular', sans-serif;
      letter-spacing: 1px;
      font-size : 12px;
      margin: 15px 0 20px 0;
      font-weight: normal;
    }

    .datamoyenne{
      color : #d3d3d3;
      text-transform: uppercase;
      font-family : 'cpcompanyregular', sans-serif;
      font-size : 22px;
      letter-spacing: 4px;
      font-weight: normal;
    }

    .sep{
      opacity: 0.42;
      margin: 0;
      margin-top: -10px;
    }

    .seul{
      position: relative;
      padding-top: 20px;
    }

    .seul:after{
      width: 22px;
      content: url(../styles/images/smiley_alone.svg);
      position: absolute;
      bottom:4px;
      left: 170px;
    }
  }

  .sidebar.is-hide{
    -webkit-transform: translateX(100%);
        -ms-transform: translateX(100%);
            transform: translateX(100%);

    .toggle-menu{
      left: -85px;
      top: 50px;
    }
  }


</style>

<template>
  <div class="sidebar" :class="{ 'is-hide': !displaySideBar }">
      <div class="relative-pos">
        <div class="buttons">
          <span class="toggle-menu" @click="toggleMenu"></span>
        </div>
        <div class="scroll-content">
          <h3>Légendes</h3>
          <hr/>
          <p class="legende-info"><span class="num">1.</span>Afficher/Masquer les facteurs affectant la solitude des arbres.</p>
          <p class="legende-info"><span class="num">2.</span>Jaugez l’importance que vous accordez à  l’impact des différents facteurs sur la solitude des arbres</p>
          <hr class="sep"/>
          <legend :params="paramsData.hauteur" @legend-update="onParamsChange" class="hauteurdata"></legend>
          <hr class="sep"/>
          <legend :params="paramsData.leafs.arbres_align_dist" @legend-update="onParamsChange"></legend>
          <hr class="sep"/>
          <legend :params="paramsData.leafs.bancs_dist" @legend-update="onParamsChange";></legend>
          <hr class="sep"/>
          <legend :params="paramsData.leafs.poteaux_bois_dist" @legend-update="onParamsChange";></legend>
          <hr class="sep"/>

          <div class="legend-align">
            <div v-if="checkbox" class="checkbox-custom">
              <input type="checkbox" id="checkbox-{{params.slug}}" name="display" v-model="params.display">
              <label for="checkbox-{{params.slug}}"></label>
            </div>
            <h4 class="distancereal">afficher les distances réelles</h4>
          </div>
          <hr class="sep"/>
          <h3 class="seul">les plus seuls</h3>
          <hr/>
          <h4 class="type">Par arrondissement</h4>
          <h2 class="datamoyenne">XIIe arrondissement</h2>
          <h4 class="type">Par genre</h4>
          <h2 class="datamoyenne">Platanus</h2>
        </div>
      </div>
  </div>
</template>

<script>
import Legend from './Legend.vue'
import $ from 'jquery';


export default {
  props: ['params-data'],
  data: () => {
    return {
      displaySideBar: false
    }
  },
  ready() {

  },
  components: {
    Legend
  },
  methods: {
    onParamsChange(params) {
      // this[params.slug].value = params.value;
      // this[params.slug].display = params.display;
      // this.$root.$broadcast('update-params', params);
    },
    toggleMenu() {
      this.displaySideBar = !this.displaySideBar;
    }
  },
  events: {
    'show-sidebar': function () {
      this.displaySideBar = true;
    }
  }
}
</script>
