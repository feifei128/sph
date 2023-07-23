// Trade模块的小仓库

// 引入封装axios的函数
import { reqTrade, reqUserAddressList, reqSubmitOrder } from '@/api'
import router from '@/router'

export default {
  state: {
    trade: {},
    userAddressList: [],
    submitOrder: {}
  },
  mutations: {
    GETTRADE(state, trade) {
      state.trade = trade
    },
    GETUSERADDRESSLIST(state, userAddressList) {
      state.userAddressList = userAddressList
    },
    GETSUBMITORDER(state, submitOrder) {
      state.submitOrder = submitOrder
      // 从trade页面提交订单成功后，跳转至pay页面，并传递订单参数
      router.push('/pay?orderId=' + state.submitOrder)
    }

  },
  actions: {
    // 获取订单信息
    async getTrade({ commit }) {
      const result = await reqTrade()
      console.log('trade:')
      console.log(result)
      if (result.code === 200) {
        commit('GETTRADE', result.data)
      }
    },
    // 获取用户地址信息
    async getUserAddressList({ commit }) {
      const result = await reqUserAddressList()
      console.log('userAddressList:')
      console.log(result)
      if (result.code === 200) {
        commit('GETUSERADDRESSLIST', result.data)
      }
    },
    // 提交订单
    async getSubmitOrder({ commit }, { tradeNo, data }) {
      const result = await reqSubmitOrder(tradeNo, data)
      console.log('submitOrder:')
      console.log(result)
      if (result.code === 200) {
        commit('GETSUBMITORDER', result.data)
      }
    }
  },
  // 计算属性，为了简化仓库的数据而生
  getters: {
    address(state) {
      return state.userAddressList || []
    },
    detailArrayList(state) {
      return state.trade.detailArrayList || []
    },
    trade(state) {
      return state.trade || {}
    },
    submitOrder(state) {
      return state.submitOrder || {}
    }
  }
}
