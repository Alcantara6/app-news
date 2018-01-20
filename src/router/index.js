import Vue from 'vue'
import Router from 'vue-router'
import topNews from '../components/topNews'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'news',
      component: topNews
    }
  ]
})
