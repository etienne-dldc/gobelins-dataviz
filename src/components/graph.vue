<template>
  <div class="container">
  </div>
</template>

<script>
import Webgl from '../classes/Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

export default {
  created() {
    // webgl settings
    this.webgl = new Webgl(window.innerWidth, window.innerHeight);
    // GUI settings
    this.gui = new dat.GUI();
    this.gui.add(this.webgl.params, 'usePostprocessing');

    // handle resize
    window.addEventListener('resize', this.resizeHandler);
  },
  compiled() {
    this.$el.appendChild(this.webgl.renderer.domElement);
  },
  ready() {
    // let's play !
    this.animate();
  },
  methods: {
    resizeHandler() {
      this.webgl.resize(window.innerWidth, window.innerHeight);
    },
    animate() {
      raf(this.animate);
      this.webgl.render();
    }
  }
}
</script>
