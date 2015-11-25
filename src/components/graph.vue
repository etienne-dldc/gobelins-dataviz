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

export default {
  ready() {
    var winHeight = $(window).height();
    $(this.$el).height(winHeight);
    this.webgl = new Webgl(this.$el.clientWidth, this.$el.clientHeight);
    // GUI settings
    this.gui = new dat.GUI();
    this.gui.add(this.webgl.params, 'usePostprocessing');
    // handle resize
    window.addEventListener('resize', this.resizeHandler);
    this.$el.appendChild(this.webgl.renderer.domElement);
    loadAllTextures( (textures) => {
      this.webgl.start();
      // let's play !
      this.animate();
    });
  },
  methods: {
    resizeHandler() {
      this.webgl.resize(this.$el.clientWidth, this.$el.clientHeight);
    },
    animate() {
      raf(this.animate);
      this.webgl.render();
    }
  }
}
</script>
