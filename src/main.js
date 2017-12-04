// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/style.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './login.js'
import axios from './myaxios.js'
import store from './store/store'

import SubTitle from './components/SubTitle'

Vue.use(iView);
// Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.component('sub-title', SubTitle)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  template: '<App/>',
  components: { App }
})
