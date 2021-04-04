/* eslint-disable */
import Vue from 'vue';
import 'babel-polyfill';
import elementUI from './common/util/elementUI.js'
import '../static/css/index.css';
// Vant
import Vant from 'vant';
import 'vant/lib/index.css';
import '../static/js/flexible.js';
import App from './App';
import store from './store';
import router from './router';
import i18n from './lang' // Internationalization
import { request } from '@/base/utils/request';
import { api } from '@/base/config/api';
import { _tiper } from '@/base/utils/ui-vant';
import '@/assets/styles/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import '@/assets/styles/element.scss'
import '@/assets/styles/incomeEnsure.scss'
import '@/assets/styles/unifiedView.scss'
import axios from 'axios';
import { getToken } from './base/utils/cookies';
import {dateFormat} from '@/assets/js/DateUtil.js';
import echarts from 'echarts'
import myCharts from '@/assets/js/mychart.js'

Vue.prototype.$api = api;
Vue.prototype.$http = request;
Vue.prototype.$tip = _tiper;
Vue.prototype.elementUI = elementUI;

Vue.use(VueAwesomeSwiper);
Date.prototype.Format =  function(fmt) {
  return dateFormat(fmt,this);
};
Vue.prototype.axios = axios;

Vue.config.productionTip = false;
// echarts
Vue.prototype.$echarts = echarts;
Vue.use(myCharts);

Vue.use(Vant);
// Vue.use(myCharts)

Vue.use(Element, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  const token = getToken();
  if (token !== '' && token !== undefined) {
    next();
  } else {
    console.log(to.name);
    if (to.name === 'login') next();
    else if (to.name === undefined || to.name === null){
      next({name : 'login'});
    }
    else {
      next({ name: 'login' });
      alert('请先登录');
    }
  }
});


let vue = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
export default vue;
