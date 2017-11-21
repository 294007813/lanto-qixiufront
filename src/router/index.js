import Vue from 'vue'
import Router from 'vue-router'

import Bone from '@/components/Bone'
import LeftMenu from '@/components/LeftMenu'

import Index from '@/pages/index'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bone',
      component: Bone,
      children:[
        {path: '/index', alias: '', name: 'index', component: Index,},
        {path: '/login', name: 'login', component: Login,},
        {path: '/register', name: 'register', component: Login,},
        {path: '/center', name: 'center', component: LeftMenu,},

      ]
    }
  ]
})
