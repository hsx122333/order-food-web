// 用户缓存模块 例子

// 开启namespaced可以避免调用vuex接口对其他模块同名属性的影响
// state 通过函数定义可以避免模块嵌套时候的数据污染
// 说明帖子： https://vuex.vuejs.org/zh/guide/state.html
// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation 。
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
export const user = {
  // 通过添加 namespaced: true 的方式使其成为带命名空间的模块。
  // 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
  namespaced: true,
  // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
  state: {
    loginNo: 'sitech',
    loginName: '思特奇'
  },
  // -> getters['user/getLoginNo']
  getters: {
    // 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来。
    getLoginNo: (state, getters, rootState) => state.loginNo,
    getLoginName: (state, getters, rootState) => state.loginName
  },

  // -> dispatch('user/loginNoSync')
  actions: {
    setLoginNoSync(state, loginNo, rootState) {
      state.loginNo = loginNo;
    },
    setLoginNameSync(state, loginName, rootState) {
      state.loginName = loginName;
    }
  },
  // -> commit('user/setLoginNo')
  mutations: {
    setLoginNo(state, loginNo, rootState) {
      state.loginNo = loginNo;
    },
    setLoginName(state, loginName, rootState) {
      state.loginName = loginName;
    }
  }
};

/*
  state:{...},
   mutations:{...},
// 嵌套模块
  modules:{
      mypage:{
         state:{...},
        getters:{
       profile(state){

      }//因为嵌套模块没有自己命名空间,所以就自动继承了父命名空间，所以就可以这样触发这个getter：store.getters['moduleA/profile'];                }            },            // 进一步嵌套命名空间            posts:{                namespaced:true,//开启命名空间                state:{...},                getters:{                    popular(){...}//前面我们说过，开启命名空间的模块它所有的getter、action、mutation都会自动根据模块的路径调整命名 -> store.getters['moduleA/posts/popular']                }            }        }    }}
 */
