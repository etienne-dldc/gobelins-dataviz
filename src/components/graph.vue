<style lang="sass" scoped>

.container {
  position: relative;
  min-height: 200px;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

</style>

<template>
  <div class="container">
  </div>
</template>

<script>
import raf from 'raf';
import dat from 'dat-gui';
import $ from 'jquery';
import 'gsap';
import Webgl from '../three/Webgl';
import { loadAllTextures } from '../three/textures';
import { loadData } from '../modules/data';

export default {
  ready() {
    this.allData = [];
    var winHeight = $(window).height();
    $(this.$el).height(winHeight);
    this.webgl = new Webgl(this.$el.clientWidth, this.$el.clientHeight);
    // GUI settings
    this.gui = new dat.GUI();
    this.gui.add(this.webgl.params, 'usePostprocessing');
    // handle resize
    window.addEventListener('resize', this.resizeHandler);
    this.$el.appendChild(this.webgl.renderer.domElement);
    // Load
    this.texturesLoaded = false;
    loadAllTextures( (textures) => {
      this.texturesLoaded = true;
      this.loaded();
    });
    this.dataLoaded = false;
    loadData( (data) => {
      this.allData = data;
      this.dataLoaded = true;
      this.loaded();
    })
  },
  methods: {
    resizeHandler() {
      this.webgl.resize(this.$el.clientWidth, this.$el.clientHeight);
    },
    animate() {
      raf(this.animate);
      this.webgl.render();
    },
    loaded() {
      if (this.texturesLoaded && this.dataLoaded) {
        this.webgl.setData(this.allData);
        this.webgl.start();
        this.animate();
        this.$dispatch('loader-off');
      }
    }
  }
}
</script>
