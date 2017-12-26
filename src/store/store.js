import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  userInfo:{}
}

const mutations={
  putUserInfo(state, obj){
    state.userInfo= obj;
  }
}

const getters = {
  loginName: function (state) {
    return state.userInfo.mobile
  },
  userHead: function (state) {
    return state.userInfo.head
  },
  nickName: function (state) {
    return state.userInfo.nickname
  },
  userName: function (state){
    return (state.userInfo.nickname?state.userInfo.nickname: state.userInfo.username? state.userInfo.username: state.userInfo.mobile);
  },
  userType: function (state) {
    return state.userInfo.roleid;
  },
  isDisabled: function (state) {
    return state.userInfo.isdisabled;
  },
}

export default new Vuex.Store({
  state,
  mutations,
  getters
});
