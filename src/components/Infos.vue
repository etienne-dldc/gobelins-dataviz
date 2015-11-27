<style lang="sass" scoped>
  .infos{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3000;
    background: rgba(27, 27, 27, 0.9);
    color: white;
    text-align: center;
    font-family: 'cpcompanyregular' sans-serif;
    text-transform: uppercase;
    color: #8c8c8c;

    h2{
      font-size: 20px;
      letter-spacing: 4px;
      margin-bottom: 30px;
    }

    p{
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 30px;
      color: #AFAFAF;
    }

    .vertical-center{
      height: 300px;
      width: 500px;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
    }

    .close-button{
      right: 90px;
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

    .close-button:hover{
      color:#999999;
      letter-spacing: 2.2px;
    }

    .close-button::before{
      width: 8px;
      content: url(../styles/images/arrow.svg);
      display: inline-block;
      position: relative;
      right: 10px;
      top: -3px;
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }

    .close-button:hover:after{
      -webkit-animation-name: wobbleright;
      animation-name: wobbleright;
      -webkit-animation-duration: 0.6s;
      animation-duration: 0.6s;
      -webkit-animation-timing-function: ease-in-out;
      animation-timing-function: ease-in-out;
      -webkit-animation-iteration-count: 1;
      animation-iteration-count: 1;
    }


  }

  @-webkit-keyframes wobbleright {
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
  <div class="infos">
    <div class="vertical-center">
      <h2>{{data.title}}</h2>
      <p>{{data.description}}</p>
      <a class="close-button" href="#" @click="close">Retour</a>
    </div>
  </div>
</template>

<script>

export default {
  props: ['data'],
  ready() {

  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>
