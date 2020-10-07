import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      title: 'Your todos',
      name: 'home',
      component: () => import('../pages/HomePage')
    },
    {
      path: '/edit/bookmark-:bookmarkId',
      title: 'Editing todo',
      name: 'edit',
      component: () => import('../pages/EditPage'),
      props: true
    }
  ]
})

export default router
