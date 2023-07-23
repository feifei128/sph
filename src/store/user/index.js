/* eslint-disable import/no-duplicates */
// 登录注册模块的小仓库

// 引入封装axios的函数
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
export default {
  state: {
    code: '',
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    CODE(state, code) {
      state.code = code
    },
    USERREGISTER(state, userRegister) {
      state.userRegister = userRegister
    },
    // 第二参数为actions函数返回的值
    USERLOGIN(state, token) {
      state.token = token
    },
    USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    LOGOUT(state) {
      // 仓库中相关用户信息清空
      state.token = ''
      state.userInfo = {}
      // 本地存储用户信息清空
      removeToken()
    }
  },
  actions: {
    // 获取验证码
    async code({ commit }, phone) {
      const result = await reqGetCode(phone)
      console.log('code:')
      console.log(result)
      if (result.code === 200) {
        commit('CODE', result.data)
      }
    },
    // 提交注册信息
    async userRegister({ commit }, data) {
      const result = await reqUserRegister(data)
      console.log('userRegister:')
      console.log(result)
      if (result.code === 200) {
        commit('USERREGISTER', result.data)
      }
    },
    // 登录业务
    async userLogin({ commit }, data) {
      const result = await reqUserLogin(data)
      console.log('userlogin:')
      console.log(result)
      if (result.code === 200) {
        commit('USERLOGIN', result.data.token)
        // 由于store是非持久化存储，一刷新token就会丢失，因此要进行本地持久化存储
        // localStorage.setItem('TOKEN', result.data.token)
        setToken(result.data.token)
      }
    },
    // token校验获取用户的登录信息
    async userInfo({ commit }) {
      const result = await reqUserInfo()
      console.log('userInfo:')
      console.log(result)
      if (result.code === 200) {
        commit('USERINFO', result.data)
      }
    },
    // 退出登录
    async logout({ commit }) {
      const result = await reqLogout()
      console.log('logout:')
      console.log(result)
      if (result.code === 200) {
        // action里面不能操作state，必须commit到mutation中去操作
        commit('LOGOUT')
      }
    }
  },
  // 计算属性，为了简化仓库的数据而生
  getters: {
  }
}
