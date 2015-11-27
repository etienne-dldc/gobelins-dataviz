<style lang="sass?outputStyle=expanded" scoped>

  @import "../styles/variables.scss";

  .sidebar{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
		width : 325px;
    background: $color_main;
    opacity : 0.94;
		padding-left: 40px;
		padding-right: 35px;

    h3{
      color : #808080;
  		text-transform: uppercase;
  		font-family : 'cpcompanyregular', sans-serif;
      font-size: 16px;
      padding-top: 30px;
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
  }

</style>

<template>
  <div class="sidebar">
      <h3>Légendes</h3>
      <hr/>
      <p class="legende-info"><span class="num">1.</span>Afficher/Masquer les facteurs affectant la solitude des arbres.</p>
      <p class="legende-info"><span class="num">2.</span>Jaugez l’importance que vous accordez à  l’impact des
	 différents facteurs sur la solitude des arbres</p>
      <hr/>
      <legend :params="paramsData.hauteur" @legend-update="onParamsChange"></legend>
      <hr/>
      <legend :params="paramsData.leafs.arbres_align_dist" @legend-update="onParamsChange"></legend>
      <hr/>
      <legend :params="paramsData.leafs.bancs_dist" @legend-update="onParamsChange";></legend>
      <hr/>
      <legend :params="paramsData.leafs.poteaux_bois_dist" @legend-update="onParamsChange";></legend>
  </div>
</template>

<script>
import Legend from './Legend.vue'
import $ from 'jquery';


export default {
  props: ['params-data'],
  data: () => {
    return {}
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
    }
  }
}
</script>
