import Vue from 'vue';
import Vuex from 'vuex';
import { user } from './modules/userM';
import getters from './getters';
import mutations from '@/store/mutations';
import { pageInfo } from './modules/pageInfo';
import { login } from './modules/login';

Vue.use(Vuex);

// root状态信息维护
const state = {
  scrollTop: {},
  userInfo: null // 网关用户信息
};

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  modules: {
    user,
    pageInfo,
    login
  }
});

export default store;
