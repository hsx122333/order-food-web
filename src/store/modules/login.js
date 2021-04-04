import { setToken, removeToken } from '../../base/utils/cookies';
import { request } from '../../base/utils/request';
import { api } from '../../base/config/api';

// 用户缓存模块 例子

// 开启namespaced可以避免调用vuex接口对其他模块同名属性的影响
// state 通过函数定义可以避免模块嵌套时候的数据污染
// 说明帖子： https://vuex.vuejs.org/zh/guide/state.html
// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation 。
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
export const login = {
  // 通过添加 namespaced: true 的方式使其成为带命名空间的模块。
  // 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
  namespaced: true,
  // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
  state: {
    cookies: '',
    userInfo: {}
  },
  // -> getters['login/getUserInfo']
  getters: {
    // 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来。
    getCookies: (state, getters, rootState) => state.cookies,
    getUserInfo: (state, getters, rootState) => state.userInfo
  },

  // -> dispatch('user/loginNoSync')
  actions: {
    LoginByUsername({ commit }, userInfo) {
      const phone = userInfo.phone.trim(); // 用户名处理，去掉两端的空格
      const param = {
        phone: phone,
        password: userInfo.password
      };
      return new Promise((resolve, reject) => {
        request.loginByUsername(api.loginStaff, param).then(res => {
          if (res.code === 200) {
            // 在每次登陆成功之后都将后台token保存在vuex及cookie中
            commit('login/SET_TOKEN', res.body); // 保存tooken到vuex中
            setToken(res.body.token);// 保存tooken到cookie中
            resolve(res)
          } else {
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoginByUsername2({ commit }, userInfo) {
      const phone = userInfo.phone.trim(); // 用户名处理，去掉两端的空格
      const param = {
        phone: phone,
        password: userInfo.password
      };
      return new Promise((resolve, reject) => {
        request.loginByUsername(api.loginStaff, param).then(res => {
          if (res.code === 200) {
            // 在每次登陆成功之后都将后台token保存在vuex及cookie中
            commit('login/SET_TOKEN', res.body); // 保存tooken到vuex中
            setToken(res.body.token);// 保存tooken到cookie中
            resolve(res)
          } else {
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve()
      })
    }
  },
  // -> commit('user/setLoginNo')
  mutations: {
    SET_TOKEN(state, cache, rootState) {
      state.cookies = cache.token;
      state.userInfo = cache.userInfo;
    }
  }
};
