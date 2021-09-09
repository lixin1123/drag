import Vue from 'vue'
import Router from 'vue-router'
import canvas from '@/components/canvas'
import content from '@/components/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'canvas',
      component: canvas
    },
    // {
    //   path: '/',
    //   name: 'content',
    //   component: content
    // }
  ]
})
