import Vue from 'vue'
import Router from 'vue-router'
//components
import Bone from '@/components/Bone'
import ArticleMenu from '@/components/ArticleMenu'
import ArticleList from '@/components/ArticleList'
import Article from '@/components/Article'
import LeftMenu from '@/components/LeftMenu'
//public
import Index from '@/pages/index'
import Login from '@/pages/public/login'
import About from '@/pages/public/about'
import CarList from '@/pages/public/eCarList'
import RecordList from '@/pages/public/eRecordList'
import RecordDetail from '@/pages/public/eRecordDetail'
import Notes from '@/pages/public/notes'
import NoteDetail from '@/pages/public/noteDetail'
import BaseInfo from '@/pages/public/baseInfo'
import ResetPassword from '@/pages/public/resetPassword'

//manage
import ManageHome from '@/pages/manager/home'
import Notify from '@/pages/manager/notify'
import Complain from '@/pages/manager/complain'
import Survey from '@/pages/manager/survey'
import Download from '@/pages/manager/download'
import Quality from '@/pages/manager/quality'
import CompanyInfo from '@/pages/manager/companyInfo'
import CompanyContactCount from '@/pages/manager/companyContactCount'

//company
import CompanyHome from '@/pages/company/home'
import ComVisit from '@/pages/company/comvisit'
import ComAppoint from '@/pages/company/comappoint'
import ComComplain from '@/pages/company/comcomplain'
import ComUpload from '@/pages/company/comupload'
import CompleteInfo from '@/pages/company/completeInfo'
import comUpRecord from '@/pages/company/uploadRecord'

//personal
import BindCar from '@/pages/personal/bindcar'
import MyQuestion from '@/pages/personal/myquestion'
import MyVisit from '@/pages/personal/myvisit'
import MyAppoint from '@/pages/personal/myappoint'

// 在线商务
import Fittings from '@/pages/business/fittings'
import Equipment from '@/pages/business/equipment'
import Insurance from '@/pages/business/insurance'
import Sell from '@/pages/business/sell'
import Sell1 from '@/pages/business/sell1'
import Sell2 from '@/pages/business/sell2'
import Sell3 from '@/pages/business/sell3'
import Train from '@/pages/business/train'
import Goods from '@/pages/business/goods'
import Books from '@/pages/business/books'
import Beautify from '@/pages/business/beautify'
import Check from '@/pages/business/check'
import Study from '@/pages/business/study'
import Study1 from '@/pages/business/study1'
import Study2 from '@/pages/business/study2'
import Study3 from '@/pages/business/study3'
import Help from '@/pages/business/help'
import Service from '@/pages/business/service'

// 公众监督
import Satisfaction from '@/pages/supervision/satisfaction'
import Satisfaction1 from '@/pages/supervision/satisfaction1'
import Complaint from '@/pages/supervision/complaint'


// 公共服务
import Maintain from '@/pages/service/maintain'
import MaintainDetail from '@/pages/service/maintainDetail'
import VisitingService from '@/pages/service/visitingService'
import ReservationFix from '@/pages/service/reservationFix'
import CarDoctor from '@/pages/service/carDoctor'
import CarDoctorDetail from '@/pages/service/carDoctorDetail'
import QuestionSearch from '@/pages/service/questionSearch'
import ProfessorDetail from '@/pages/service/professorDetail'

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
        {path: '/forget', name: 'forget', component: Login,},
        {path: '/about', name: 'about', component: About,},
        {path: '/completeInfo', name: 'completeInfo', component: CompleteInfo,},
        {path: '/public', name: 'public', component: ArticleMenu, children:[
            {path: '/public/articleList', name: 'articleList', component: ArticleList},
            {path: '/public/article', name: 'article', component: Article},
          ]},
        {path: '/association', name: 'association', component: ArticleMenu, children:[
            {path: '/association/articleList', name: 'assArticleList', component: ArticleList},
            {path: '/association/article', name: 'assArticle', component: Article},
          ]},
        {path: '/center', name: 'center', component: LeftMenu, children:[
            //管理中心
            {path: '/center/manHome', name: 'manHome', component: ManageHome, meta: { requiresAuth: true }},
            {path: '/center/manNotify', name: 'notify', component: Notify, meta: { requiresAuth: true }},
            {path: '/center/manComplain', name: 'complain', component: Complain, meta: { requiresAuth: true }},
            {path: '/center/manDownload', name: 'download', component: Download},
            {path: '/center/manSurvey', name: 'survey', component: Survey, meta: { requiresAuth: true }},
            {path: '/center/manQuality', name: 'quality', component: Quality, meta: { requiresAuth: true}},
            {path: '/center/manCompanyInfo', name: 'companyInfo', component: CompanyInfo, meta: { requiresAuth: true}},
            {path: '/center/companyContactCount', name: 'companyContactCount', component: CompanyContactCount, meta: { requiresAuth: true}},

            //企业中心
            {path: '/center/comHome', name: 'comHome', component: CompanyHome, meta: { requiresAuth: true }},
            {path: '/center/comVisit', name: 'comVisit', component: ComVisit, meta: { requiresAuth: true }},
            {path: '/center/comAppoint', name: 'comAppoint', component: ComAppoint, meta: { requiresAuth: true }},
            {path: '/center/comComplain', name: 'comComplain', component: ComComplain, meta: { requiresAuth: true }},
            {path: '/center/comUpload', name: 'comUpload', component: ComUpload, meta: { requiresAuth: true }},
            {path: '/center/comUpRecord', name: 'comUpRecord', component: comUpRecord, meta: { requiresAuth: true }},

            //车主中心
            {path: '/center/perBindcar', name: 'perBindcar', component: BindCar, meta: { requiresAuth: true }},
            {path: '/center/perMyquestion', name: 'perMyquestion', component: MyQuestion, meta: { requiresAuth: true }},
            {path: '/center/perMyvisit', name: 'perMyvisit', component: MyVisit, meta: { requiresAuth: true }},
            {path: '/center/perMyappoint', name: 'perMyappoint', component: MyAppoint, meta: { requiresAuth: true }},

            //共用组件
            {path: '/center/eCarList', name: 'eCarList', component: CarList, meta: { requiresAuth: true }},
            {path: '/center/eRecordList', name: 'eRecordList', component: RecordList, meta: { requiresAuth: true }},
            {path: '/center/eRecordDetail', name: 'eRecordDetail', component: RecordDetail, meta: { requiresAuth: true }},
            {path: '/center/notes', name: 'notes', component: Notes, meta: { requiresAuth: true }},
            {path: '/center/noteDetail', name: 'noteDetail', component: NoteDetail, meta: { requiresAuth: true }},
            {path: '/center/baseInfo', name: 'baseInfo', component: BaseInfo, meta: { requiresAuth: true}},
            {path: '/center/resetPassword', name: 'resetPassword', component: ResetPassword, meta: { requiresAuth: true}},
        ]},

        // 在线商务
        {path: '/business/fittings', name: 'business', component: Fittings},
        {path: '/business/equipment', name: 'equipment', component: Equipment},
        {path: '/business/insurance', name: 'insurance', component: Insurance},
        {path: '/business/sell', name: 'sell', component: Sell},
        {path: '/business/sell1', name: 'sell1', component: Sell1},
        {path: '/business/sell2', name: 'sell2', component: Sell2},
        {path: '/business/sell3', name: 'sell3', component: Sell3},
        {path: '/business/train', name: 'train', component: Train},
        {path: '/business/goods', name: 'goods', component: Goods},
        {path: '/business/books', name: 'books', component: Books},
        {path: '/business/beautify', name: 'beautify', component: Beautify},
        {path: '/business/check', name: 'check', component: Check},
        {path: '/business/study', name: 'study', component: Study},
        {path: '/business/study1', name: 'study1', component: Study1},
        {path: '/business/study2', name: 'study2', component: Study2},
        {path: '/business/study3', name: 'study3', component: Study3},
        {path: '/business/help', name: 'help', component: Help},
        {path: '/business/service', name: 'service', component: Service},

        // 公众监督
        {path: '/supervision/satisfaction', name: 'satisfaction', component: Satisfaction},
        {path: '/supervision/Satisfaction1', name: 'Satisfaction1', component: Satisfaction1},
        {path: '/supervision/complaint', name: 'complaint', component: Complaint},

        // 公共服务
        {path: '/service/visitingService', name: 'visitingService', component: VisitingService, meta: { requiresAuth: true }},
        {path: '/service/reservationFix', name: 'reservationFix', component: ReservationFix, meta: { requiresAuth: true }},
        {path: '/service/carDoctor', name: 'carDoctor', component: CarDoctor},
        {path: '/service/carDoctorDetail', name: 'carDoctorDetail', component: CarDoctorDetail},
        {path: '/service/questionSearch', name: 'questionSearch', component: QuestionSearch},
        {path: '/service/professorDetail', name: 'professorDetail', component: ProfessorDetail},
        {path: '/maintain', name: 'maintain', component: Maintain},
        {path: '/maintainDetail', name: 'maintainDetail', component: MaintainDetail},
      ]
    }
  ]
})
