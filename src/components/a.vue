<style scoped>
.container {
  border: 1px solid #00f;
}
.red {
  color: #f00;
}
</style>

<template>
  <div class="container">
    <h2 class="red">Test {{msg}}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Yo from Component A!'
    }
  }
}
</script>
