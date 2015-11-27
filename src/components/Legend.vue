<style lang="sass" scoped>
  .legend-elem{
    margin-bottom: 20px;

    .legend-point{
      display: inline-block;
      width: 9px;
      height: 9px;
      -moz-border-radius: 200px;
      -webkit-border-radius: 200px;
      border-radius: 200px;
      margin-right: 40px;
      margin-top: 25px;
      margin-left: 40px;
    }

    .checkbox-custom {
      width: 28px;
      height: 28px;
      background: none;
      margin-top: 17px;

      position: relative;

      input[type=checkbox] {
        visibility: hidden;
      }

      label {
        cursor: pointer;
        position: absolute;
        border: 1px solid #3d3d3d;
        width: 15px;
        height: 15px;
        left: 3px;
        top: 3px;
        transition:0.35s;
        webkit-transition:0.35s;
      }

      label:after {
        opacity: 0;
        content: '';
        position: absolute;
        width: 12px;
        height: 5px;
        background: transparent;
        top: 1px;
        left: 1px;
        border: 2px solid #949494;
        border-top: none;
        border-right: none;
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        transform: rotate(-45deg);
        transition:0.15s;
        webkit-transition:0.15s;
      }

      label:hover::after {
        opacity: 0.3;
      }

      input[type=checkbox]:checked + label:after {
        opacity: 1;
      }
    }



    h4{
      font-family: 'cpcompanyregular' sans-serif;
      letter-spacing: 1px;
      color: #cdcdcd;
      font-size:12px;
      margin-bottom: 10px;
      text-transform:uppercase;
    }

    .legend-align > * {
      vertical-align: top;
    }

    .legend-align{
      display:flex;
      display: -webkit-flex;
    }

    .nameslide{
      width : 120px;
      height : 100%;
      margin-right:30px;
    }

    .info{
      font-family: 'cpcompanyregular' sans-serif;
      text-transform: uppercase;
      color: #8c8c8c;
      font-size: 9px;
      transition:0.35s;
      webkit-transition:0.35s;
      text-decoration:none;
      font-size: 11px;
      vertical-align:middle;
      padding-top:35px;
      letter-spacing: 3px;
      position:relative;
    }

    .info:hover{
      color:#999999;
      letter-spacing: 2.2px;
    }

    .info:after{
      width: 6px;
      content: url(../styles/images/arrow.svg);
      position: absolute;
      top: 35px;
      right: -16px;
    }

    .info:hover:after{
      -webkit-animation-name: wobbleright;
      animation-name: wobbleright;
      -webkit-animation-duration: 0.6s;
      animation-duration: 0.6s;
      -webkit-animation-timing-function: ease-in-out;
      animation-timing-function: ease-in-out;
      -webkit-animation-iteration-count: 1;
      animation-iteration-count: 1;
    }

    @keyframes wobbleright {
      16.65% {
        -webkit-transform: translate(8px, 0px);
        transform: translate(8px, 0px);
      }

      66.6% {
        -webkit-transform: translate(-2px, 0px);
        transform: translate(-2px, 0px);
      }

      100% {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
      }
    }
  }
</style>

<template>
  <div class="legend-elem">
    <div class="legend-align">
      <div v-if="checkbox" class="checkbox-custom">
        <input type="checkbox" id="checkbox-{{params.slug}}" name="display" v-model="params.display">
      	<label for="checkbox-{{params.slug}}"></label>
      </div>
      <span v-if="color" class="legend-point" :style="{ backgroundColor: params.colorLegend }"></span>
      <div class="nameslide">
        <h4>{{ params.name }}</h4>
        <slider :slug="params.slug" :value="params.user_multiplier * 100" @slider-change="onSliderChange"></slider>
      </div>
      <a class="info" href="#" @click="onInfosClick">info</a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Slider from './Slider.vue';

export default {
  props: ['params'],
  data: () => {
    return {
      checkbox: true,
      color: true
    };
  },
  ready() {

    if (this.params.colorLegend == undefined) { this.color = false }
    if (this.params.display == undefined) { this.checkbox = false }

    this.$watch('params.display', function (newVal, oldVal) {
      this.$dispatch('params-update');
    });
  },
  components: {
    Slider
  },
  methods: {
    onSliderChange(name, value) {
      this.params.user_multiplier = value / 100;
      this.$dispatch('params-update');
    },
    onInfosClick(){
      this.$dispatch('show-infos', this.params.infos);
    }
  }
}
</script>
