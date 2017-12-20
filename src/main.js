// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/style.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import { Rate } from 'element-ui'
//import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './login.js'
import axios from './myaxios.js'
import store from './store/store'

import SubTitle from './components/SubTitle'
import ProfessorList from './components/ProfessorList'


Vue.use(iView);
Vue.use(Rate) //评价组件
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.component('sub-title', SubTitle)
Vue.component('chart', ECharts)
Vue.component('Professor-list', ProfessorList) // 专家列表组件

Vue.prototype.userType = function () {
  return store.getters.userType
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  template: '<App/>',
  components: { App }
})


