<style lang="sass" scoped>
  .legend-elem{

    margin-bottom: 20px;

    h4{
      font-family: 'cpcompanyregular' sans-serif;
      letter-spacing: 1px;
      color: #cdcdcd;
      margin-bottom: 10px;
    }

    .legend-point{
      display: inline-block;
      width: 12px;
      height: 12px;
      -moz-border-radius: 200px;
      -webkit-border-radius: 200px;
      border-radius: 200px;
      margin-right: 20px;
      margin-top: 25px;
      margin-left: 20px;
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
      	width: 20px;
      	height: 20px;
      	left: 3px;
      	top: 3px;
      }

      label:after {
      	opacity: 0;
      	content: '';
      	position: absolute;
        width: 14px;
        height: 6px;
        background: transparent;
        top: 4px;
        left: 2px;
        border: 2px solid #949494;
      	border-top: none;
      	border-right: none;

      	-webkit-transform: rotate(-45deg);
      	-moz-transform: rotate(-45deg);
      	-o-transform: rotate(-45deg);
      	-ms-transform: rotate(-45deg);
      	transform: rotate(-45deg);
      }

      label:hover::after {
      	opacity: 0.3;
      }

      input[type=checkbox]:checked + label:after {
      	opacity: 1;
      }
    }

    .legend-align > * {
      display: inline-block;
      vertical-align: top;
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
      <h4>{{ params.name }}</h4>
    </div>
    <slider :slug="params.slug" :value="params.user_multiplier * 100" @slider-change="onSliderChange"></slider>
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
    }
  }
}
</script>
