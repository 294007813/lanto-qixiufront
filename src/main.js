// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import ElementUI from 'element-ui'
import 'iview/dist/styles/iview.css';
// import 'element-ui/lib/theme-chalk/index.css'
import './login.js'
import axios from './myaxios.js'

Vue.use(iView);
// Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  template: '<App/>',
  components: { App }
})
