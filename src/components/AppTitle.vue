<style lang="sass" scoped>
  .app-title{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 700px;
    height: 100px;
    padding-left: 30px;

    h1{
      color: #c4c4c4;
      font-size: 20px;
      letter-spacing: 3px;
      font-weight: 300;
      text-transform: uppercase;
      font-family: 'cpcompanyregular' sans-serif;
      word-spacing: 6px;
      margin-bottom: 0;

      .paris{
        display: inline-block;
        height: 79px;
        width: 49px;
        background: url('../styles/images/paris.png') no-repeat;
      }
    }

    h2{
      font-family: ‘Helvetica-Neue’, sans-serif;
      font-weight: 300;
      font-size: 17px;
      color: #6d6d6d;
      margin-top: 5px;
    }
  }
</style>

<template>
  <div class="app-title">
    <h1>les arbres de <span class="paris"></span> se sentent-ils seuls ?</h1>
    <h2>Représentation interactive du degré de solitude des arbres de Paris</h2>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  ready() {

  },
  methods: {

  }
}
</script>
