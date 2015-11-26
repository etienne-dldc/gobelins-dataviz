var Vue = require('vue')
var App = require('./App.vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter)

new Vue({
  el: 'body',
  components: {
    app: App
  }
})
