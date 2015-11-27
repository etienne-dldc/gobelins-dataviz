<style lang="sass">
  .slider{
    //width: 200px;
    height: 30px;
    padding-top: 5px;
  }

  // noUiSlider
  .noUi-horizontal.noUi-custom {
    border: none;
    border-radius: 0px;
    height: 4px;
    margin-top: 10px;
    margin-bottom: 10px;
    background: #595959;
    box-shadow: none;

    .noUi-handle {
      border: none;
      border-radius: 0px;
      width: 10px;
      background: white;
      height: 28px;
      left: -5px;
      top: -12px;
    }
    .noUi-handle:before, .noUi-handle:after{
      content: none;
    }

    .noUi-base {
      height: 24px;
      top: -10px;
    }

    .noUi-origin {
      background: #2c2c2c;
      border-radius: 0px;
      height: 4px;
      top: 10px;
    }

  }
</style>

<template>
  <div class="slider">
    <div class="slider-range noUi-custom"></div>
  </div>
</template>

<script>
import $ from 'jquery';
import noUiSlider from 'nouislider';

export default {
  props: ['slug', 'value'],
  ready() {

    var rangeSlider = $(this.$el).find('.slider-range').get(0);

    noUiSlider.create(rangeSlider, {
    	start: [ this.value ],
    	range: {
    		'min': [  0 ],
    		'max': [ 100 ]
    	}
    });

    rangeSlider.noUiSlider.on('change', ( value, handle ) => {
      this.value = value;
    	this.$emit('slider-change', this.slug, parseFloat(value[0]));
    });
  },
  methods: {

  }
}
</script>
