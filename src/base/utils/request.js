/*
 *axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import { _tiper, LOAD } from '@/base/utils/ui-vant';
import { getToken } from './cookies';
import store from '../../store'

axios.defaults.timeout = 60000; // 请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; // post json 编码

/**
 * 请求拦截器
 * TODO 后续根据网关拦截实现
 */

axios.interceptors.request.use(
  config => {
    if (store.getters['login/getCookies']) {
      // 让每个请求携带token-- ['XN-Auth']为自定义Header key
      config.headers['token'] = getToken()
    }
    return config;
  },
  error => {
    return Promise.error(error);
  }
);
/**
 * 响应拦截器
 * TODO 定义错误发生的处理事件
 */

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    console.error(error);
    if (error.response.status) {
      switch (error.response.status) {
        case 404:
          _tiper.error('接口请求不存在');
          break;
        // 其他错误，直接抛出错误提示
        case 401:
          _tiper.error('你还未登录系统！');
          window.location.href =
            window.location.origin + '/order-food-web/#/401';
          break;
        case 500:
          _tiper.error('error', '请求系统数据异常');
          break;
        default:
          _tiper.error(
            '状态码：' +
            error.response.status +
            ' 接口请求过程异常：' +
            error.response.data.message
              ? '系统异常'
              : JSON.stringify(error.response.data.message)
          );
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * axios post 请求
 * @param {String} method [请求接口方法名称]
 * @param {Object} param [请求参数]
 * @param {Object} options [加载框参数]
 */
function postJson(method, param, options) {
  return new Promise((resolve, reject) => {
    loading(true, options);
    axios
      .post(method, param)
      .then(res => {
        resolve(res.data);
        loading(false, options);
      })
      .catch(err => {
        reject(err);
        loading(false, options);
      });
  });
}

/**
 * axios get 请求
 * @param {String} method [请求接口方法名称]
 * @param {Object} param [请求参数,如'/user?ID=12345' 应该为{ID: 12345}]
 */
function getJson(method, param, options) {
  return new Promise((resolve, reject) => {
    loading(true, options);
    axios
      .get(method, {
        params: param
      })
      .then(res => {
        resolve(res.data);
        loading(false, options);
      })
      .catch(err => {
        reject(err);
        loading(false, options);
      });
  });
}

/**
 * 加载框事件
 * @param {boolean} flag  开关标志
 * @param {Object} options [加载框参数]
 */
function loading(flag, options) {
  options = options || {};
  const msg = options.msg ? options.msg : null;
  // let target = options.el ? options.el.replace(/#|\./,""): "";
  const target = options.el ? options.el : '';
  const loadingCount = request.temp['loadingCount' + target];
  const loadingInstance = request.temp['loadingInstance' + target];
  if (isNaN(loadingCount)) {
    request.temp['loadingCount' + target] = 0;
  }
  /* console.log(target);
  console.log(loadingCount);
  console.log(loadingInstance); */

  if (flag) {
    if (++request.temp['loadingCount' + target] === 1) {
      request.temp['loadingInstance' + target] = LOAD(msg, target);
    }
  } else {
    if (--request.temp['loadingCount' + target] === 0) {
      if (loadingInstance) {
        request.temp['loadingInstance' + target].close();
        request.temp['loadingInstance' + target] = null;
      }
    }
  }
}

const request = {
  postJson: postJson,
  getJson: getJson,
  loginByUsername: postJson,
  temp: {
    loadingCount: 0, // 加载计数器
    loadingInstance: null, // 加载实例
    userInfoTemp: null // 用户信息缓存
  }
};

export { request };
