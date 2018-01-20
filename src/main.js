import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
