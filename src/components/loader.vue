<style lang="sass" scoped>
  .loader {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    color: white;
    font-size: 20px;
    z-index: 1000;
    text-align: center;
  }

  p{
    padding-top: 200px;
  }
</style>

<template>
  <div class="loader">
    <p>Loading...</p>
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
