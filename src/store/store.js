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
  userName: function (state){
    return (state.userInfo.userName? state.userInfo.userName: state.userInfo.telphone);
  },
  userType: function (state) {
    return state.userInfo.userRoleId;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
});
