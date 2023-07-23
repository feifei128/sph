// Pay模块的小仓库

// 引入封装axios的函数
import { reqOrderPayInfo, reqPayStatus } from '@/api'

export default {
  state: {
    orderPayInfo: {},
    payStatus: ''
  },
  mutations: {
    GETORDERPAYINFO(state, orderPayInfo) {
      state.orderPayInfo = orderPayInfo
    },
    GETPAYSTATUS(state, payStatus) {
      state.payStatus = payStatus
    }

  },
  actions: {
    // 获取订单支付信息
    async getOrderPayInfo({ commit }, orderId) {
      const result = await reqOrderPayInfo(orderId)
      console.log('orderPayInfo:')
      console.log(result)
      if (result.code === 200) {
        commit('GETORDERPAYINFO', result.data)
      }
    },
    // 订单支付状态
    async getPayStatus({ commit }, orderId) {
      const result = await reqPayStatus(orderId)
      console.log('payStatus:')
      console.log(result)

      commit('GETPAYSTATUS', result.code)
    }
  },
  // 计算属性，为了简化仓库的数据而生
  getters: {
    payInfo(state) {
      return state.orderPayInfo
    },
    payStatus(state) {
      return state.payStatus
    }
  }
}
