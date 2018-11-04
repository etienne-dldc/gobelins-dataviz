<style lang="sass" scoped>
  .intro{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1100;
  }

  .skip-intro{
    position: absolute;
    z-index: 1110;
    color: white;
    bottom: 60px;
    right: 90px;
    font-family: 'cpcompanyregular' sans-serif;
    text-transform: uppercase;
    color: #8c8c8c;
    -webkit-transition: 0.35s;
    transition: 0.35s;
    text-decoration: none;
    font-size: 12px;
    vertical-align: middle;
    padding-top: 35px;
    letter-spacing: 2px;
    cursor:pointer;
  }
  .skip-intro:hover{
    color:#999999;
    letter-spacing: 2.2px;
  }

  .skip-intro:after{
    width: 8px;
    content: url(../styles/images/arrow.svg);
    position: absolute;
    bottom:-2px;
    right: -20px;
  }

  .skip-intro:hover:after{
    -webkit-animation-name: wobbleright;
    animation-name: wobbleright;
    -webkit-animation-duration: 0.6s;
    animation-duration: 0.6s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
  }

  .play-intro{
    position: absolute;
    z-index: 1110;
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'cpcompanyregular' sans-serif;
    text-transform: uppercase;
    color: #8c8c8c;
    -webkit-transition: 0.35s;
    transition: 0.35s;
    text-decoration: none;
    font-size: 12px;
    vertical-align: middle;
    padding-top: 35px;
    letter-spacing: 2px;
    cursor:pointer;
  }
  .play-intro:hover{
    color:#999999;
    letter-spacing: 2.2px;
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
</style>

<template>
  <div class="intro">
    <div class="intro-video">
      <video id="video-intro" class="video-js vjs-default-skin">
        <source src="video/intro.webm" type='video/webm' />
        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
      </video>
    </div>
    <p @click="skipIntro" class="skip-intro">Passer l'intro</p>
    <p v-if="!playing" @click="playIntro" class="play-intro">Play Intro</p>
  </div>
</template>

<script>
import $ from 'jquery';
import videojs from 'video.js';

export default {
  data() {
    return {
      playing: false,
    };
  },
  ready() {
    let videoRatio = 16 / 9;
    let screenWidth = $(this.$el).width();
    let screenHeight = $(this.$el).height();
    let screenRatio = screenWidth / screenHeight;
    let vidHeight, vidWidth, vidLeft, vidTop;
    if (screenRatio < videoRatio) {
      // Fit height
      vidHeight = screenHeight;
      vidTop = 0;
      vidWidth = vidHeight * videoRatio;
      vidLeft = (screenWidth - vidWidth) / 2;
    } else {
      // Fit width
      vidWidth = screenWidth;
      vidLeft = 0;
      vidHeight = vidWidth * (1 / videoRatio);
      vidTop = (screenHeight - vidHeight) / 2;
    }
    $(this.$el)
      .find('.intro-video')
      .css({
        width: vidWidth,
        height: vidHeight,
        marginLeft: vidLeft,
        marginTop: vidTop,
      });

    var that = this;

    videojs(
      'video-intro',
      {
        autoplay: false,
        preload: 'auto',
        width: vidWidth,
        height: vidHeight,
        //"poster": "http://video-js.zencoder.com/oceans-clip.png"
      },
      function() {
        // Player (this) is initialized and ready.
        that.player = this;
        // that.player.play();
        that.$dispatch('loader-off');
        that.player.on('ended', function() {
          that.$dispatch('intro-end');
        });
      }
    );
  },
  methods: {
    skipIntro() {
      setTimeout(() => {
        this.player.pause();
      }, 300);
      this.$dispatch('intro-end');
    },
    playIntro() {
      this.player.play();
      this.playing = true;
      this.$dispatch('intro-start');
    },
  },
  events: {
    'sound-status': function(sound) {
      console.log(this.player);
      if (sound) {
        this.player.volume(0);
      } else {
        this.player.volume(1);
      }
    },
  },
};
</script>
