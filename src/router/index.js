import Vue from 'vue'
import Router from 'vue-router'
//components
import Bone from '@/components/Bone'
import LeftMenu from '@/components/LeftMenu'
//public
import Index from '@/pages/index'
import Login from '@/pages/login'
import About from '@/pages/about'
//manage
import ManageHome from '@/pages/manager/home'

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
        {path: '/about', name: 'about', component: About,},
        {path: '/center', name: 'center', component: LeftMenu, children:[
            {path: '/center/manHome', name: 'manHome', component: ManageHome, meta: { requiresAuth: true }},
        ]},


      ]
    }
  ]
})
