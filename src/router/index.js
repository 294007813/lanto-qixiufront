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
import Notes from '@/pages/public/notes'
import BaseInfo from '@/pages/public/baseInfo'
import ResetPassword from '@/pages/public/resetPassword'

//manage
import ManageHome from '@/pages/manager/home'
import Notify from '@/pages/manager/notify'
import Complain from '@/pages/manager/complain'
import Survey from '@/pages/manager/survey'
import Download from '@/pages/manager/download'
import Quality from '@/pages/manager/quality'

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
            {path: '/center/manNotify', name: 'notify', component: Notify, meta: { requiresAuth: true }},
            {path: '/center/comHome', name: 'comHome', component: CompanyHome, meta: { requiresAuth: true }},
            {path: '/center/eRecordList', name: 'eRecordList', component: RecordList, meta: { requiresAuth: true }},
            {path: '/center/notes', name: 'notes', component: Notes, meta: { requiresAuth: true }},
            {path: '/center/complain', name: 'complain', component: Complain, meta: { requiresAuth: true }},
            {path: '/center/survey', name: 'survey', component: Survey, meta: { requiresAuth: true }},
            {path: '/center/download', name: 'download', component: Download},
            {path: '/center/quality', name: 'quality', component: Quality},
            {path: '/center/baseInfo', name: 'baseInfo', component: BaseInfo},
            {path: '/center/resetPassword', name: 'resetPassword', component: ResetPassword, meta: { requiresAuth: true }},
        ]},
      ]
    }
  ]
})
