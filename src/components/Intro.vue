<style lang="sass" scoped>
  .intro-video{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

<template>
  <div class="intro">
    <div class="intro-video">
      <video id="video-intro" class="video-js vjs-default-skin">
        <source src="video/intro.webm" type='video/webm' />
        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
      </video>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import videojs from 'video.js';

export default {
  ready() {
    videojs("video-intro", {
      "autoplay": true,
      "preload": "auto",
      "width": $(this.$el).width(),
      //"poster": "http://video-js.zencoder.com/oceans-clip.png"
    }, () => {
      // Player (this) is initialized and ready.
      this.$dispatch('loader-off');
    });
  },
  methods: {

  }
}
</script>
