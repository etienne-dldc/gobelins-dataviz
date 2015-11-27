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
    		font-size : 22px;
    		margin-bottom: 5px;
        margin-top: 15px;
    		font-style: italic;
      }

      .espece{
        color : #999999;
    		text-transform: uppercase;
    		font-family : Garamond serif;
        font-size: 16px;
        letter-spacing: 3px;
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
    }
  }
</style>

<template>
  <div class="details">
    <div class="details-content">
      <p class="title">Infomations</p>
      <hr>
      <p class="nom-commun">{{data.nom_commun}}</p>
      <p class="espece">{{data.espece}}</p>
      <p class="annee_pla">Année de plantation : {{data.annee_pla}}</p>
      <p class="hauteur">Hauteur de l'arbre : {{data.hauteur}} m</p>
      <p class="nom_ev"><span class="nom-ev-icon"></span> {{data.nom_ev}}</p>
      <hr>


    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: ['data'],
  ready() {
    // this.$watch('data', function (oldData, newData) {
    //   console.log(newData);
    // })
  },
  methods: {

  }
}
</script>
'
