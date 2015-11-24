var Vue = require('vue')
var App = require('./app.vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter)

new Vue({
  el: 'body',
  components: {
    app: App
  }
})
