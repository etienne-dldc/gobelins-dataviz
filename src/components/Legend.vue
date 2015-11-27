<style lang="sass" scoped>
  .legend-elem{

    h4{
      font-family: 'cpcompanyregular', sans-serif;
      letter-spacing: 1px;
      color: #cdcdcd;
    }

    .legend-align{

    }

    .legend-point{
      display: inline-block;
      width: 12px;
      height: 12px;
      -moz-border-radius: 200px;
      -webkit-border-radius: 200px;
      border-radius: 200px;
      margin-right : 30px;
    }
  }
</style>

<template>
  <div class="legend-elem">
    <h4>{{ params.name }}</h4>
    <div class="legend-align">
      <input v-if="checkbox" type="checkbox" id="checkbox" v-model="params.display">
      <span v-if="color" class="legend-point" :style="{ backgroundColor: params.colorLegend }"></span>
      <slider :slug="params.slug" :value="params.user_multiplier * 100" @slider-change="onSliderChange"></slider>
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
    }
  }
}
</script>
