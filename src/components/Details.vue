<style lang="sass" scoped>
  .details{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 305px;

    .details-content{
      background : #1b1b1b;
      color: #999999;
  		opacity : 0.98 ;
  		width : 275px;
      margin: 15px;
  		padding: 14px;
      min-height: 200px;
      box-shadow: 0 0 36px -12px rgba(255, 255, 255, 0.2);
      opacity: 0.94;
      box-sizing: border-box;

      .title{
        margin-top: 0;
        color : #808080;
    		text-transform: uppercase;
    		font-family : 'cpcompanyregular' sans-serif;
        font-size: 14px;
        padding-bottom: 5px;
        margin-bottom: 0;
      }

      hr{
        background: #303030;
        height: 1px;
        border: none;
      }

      .nom-commun{
        color : #999999;
        text-transform: uppercase;
        font-family : 'cpcompanyregular' sans-serif;
        font-size : 18px;
        margin-bottom: 5px;
        margin-top: 15px;
        font-style: italic;
      }

      .espece{
        color : #999999;
        text-transform: uppercase;
        font-family : Garamond serif;
        font-size: 14px;
        letter-spacing: 6px;
        margin-bottom: 20px;
        margin-top: 0;
        margin-left: 4px;
      }

      .annee_pla, .hauteur{
        color : #999999;
    		text-transform: uppercase;
    		font-family : 'cpcompanyregular' sans-serif;
    		font-size : 16px;
    		margin-bottom: 14px;
      }

      .nom_ev{
        color: #b2b2b2;
        text-transform: uppercase;
        font-family: ‘Cpcompany’, sans-serif;
        font-size: 11px;
        font-style: italic;
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 1.9;
        vertical-align: middle;
      }
      .nom_ev:before{
        width: 16px;
        height: 20px;
        vertical-align: middle;
        content: '';
        display: inline-block;
        background: url(../styles/images/location.svg) no-repeat;
      }

      .rayon{
        color : #999999;
        text-transform: uppercase;
        font-family : 'cpcompanyregular' sans-serif;
        font-size : 16px;
        margin-bottom: 8px;
      }

      .leafs-list {
        list-style-type: none;
        padding-left: 0;
        margin-top: 0;

        li{
          line-height: 2.2;
          font-size: 13px;
          text-transform: uppercase;

          b{
            display: inline-block;
            width: 35px;
          }
        }
      }

      .leafs-point{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 30px;
        vertical-align: middle;
        margin: 6px 20px;
      }
    }

    b{
      color: #CACACA;
    }
  }
</style>

<template>
  <div class="details">
    <div class="details-content">
      <p class="title">Infomations</p>
      <hr>
      <p class="nom-commun">{{data.infos.nom_commun}}</p>
      <p class="espece">{{data.infos.espece}}</p>
      <p class="annee_pla">Année de plantation : <b>{{data.infos.annee_pla}}</b></p>
      <p class="hauteur">Hauteur de l'arbre : <b>{{data.infos.hauteur}} m</b></p>
      <p class="nom_ev"><span class="nom-ev-icon"></span> {{data.infos.nom_ev}}</p>
      <hr>
      <p class="rayon"><b>{{rayonMetters}} m</b> de champ de vision</p>
      <ul class="leafs-list">
        <li v-for="(key, leaf) in data.params.leafs">
          <span class="leafs-point" :style="{background: paramsData.leafs[key].colorLegend }"></span><b>{{leaf.particles}}</b> {{paramsData.leafs[key].name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Tools from '../modules/tools';

export default {
  props: ['data', 'paramsData'],
  ready() {
    // this.$watch('data', function (oldData, newData) {
    //   console.log(newData);
    // })
    console.log(this.data.params);
  },
  computed: {
    // a computed getter
    rayonMetters: function () {
      return Math.floor(Tools.geoDistToKilometre(this.data.params.rayon) * 1000);
    }
  },
  methods: {

  }
}
</script>
'
