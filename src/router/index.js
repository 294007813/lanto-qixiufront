import Vue from 'vue'
import Router from 'vue-router'
import Bone from '@/components/Bone'
import Index from '@/pages/index'
import LeftMenu from '@/components/LeftMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bone',
      component: Bone,
      children:[
        {path: '/index', alias: '', name: 'index', component: Index,},
        {path: '/center', name: 'center', component: LeftMenu,}
      ]
    }
  ]
})
