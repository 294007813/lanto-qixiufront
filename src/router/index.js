import Vue from 'vue'
import Router from 'vue-router'
//components
import Bone from '@/components/Bone'
import LeftMenu from '@/components/LeftMenu'
//public
import Index from '@/pages/index'
import Login from '@/pages/public/login'
import About from '@/pages/public/about'
import RecordList from '@/pages/public/eRecordList'
//manage
import ManageHome from '@/pages/manager/home'

//company
import CompanyHome from '@/pages/company/home'

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

            {path: '/center/comHome', name: 'comHome', component: CompanyHome, meta: { requiresAuth: true }},

            {path: '/center/eRecordList', name: 'eRecordList', component: RecordList, meta: { requiresAuth: true }},
        ]},


      ]
    }
  ]
})
