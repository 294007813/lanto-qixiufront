import axios from 'axios'
import router from './router'
import store from './store/store'
// axios 配置
axios.defaults.timeout = 10000;
// axios.defaults.baseURL = 'http://product.qixiu.shanghaiqixiu.org';
// axios.defaults.baseURL = 'http://api.dev.shanghaiqixiu.org:8080/'
axios.defaults.baseURL = 'http://192.168.169.105:9092/provider/'

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response);
    switch (response.data.code){
      //没有访问权限
      case '130410':
      //系统票据失效
      case '130411':{
        localStorage.removeItem("SYSTEMTOKEN")
        let data={
          device: uuid(),
          password: "k5pg8kkN",
          username: "pcqixiu"
        }
        axios({
          method: 'post',
          url: '/system/terminalsystem/login',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(data)
        }).then(function (response) {
//        console.log(response)
          localStorage.setItem("SYSTEMTOKEN", response.data.data.systemToken)
          // router.go(0)
        })
        break
      }
      //该票据不存在
      case '130405':{
        localStorage.clear()
        break
      }
      //票据非法
      case '130408':{}
      //用户票据失效
      case '130412':{
        localStorage.removeItem("ACCESSTOKEN");
        localStorage.removeItem("USERINFO");
        store.commit("putUserInfo",{})
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        });
        break
      }
    }
    return response;
  },
  error => {
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  });

export default axios;

function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  // s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
