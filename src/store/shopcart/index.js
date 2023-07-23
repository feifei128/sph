/* eslint-disable import/no-duplicates */
// ShopCart模块的小仓库

// 引入封装axios的函数
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

export default {
  state: {
    cartList: {},
    deleteCartList: {},
    updateCheckedById: {}
  },
  mutations: {
    CARTLIST(state, cartList) {
      state.cartList = cartList
    },
    DELETECARTLIST(state, deleteCartList) {
      state.deleteCartList = deleteCartList
    },
    UPDATECHECKEDBYID(state, updateCheckedById) {
      state.updateCheckedById = updateCheckedById
    }
  },
  actions: {
    // 购物车数据渲染
    async cartList({ commit }) {
      const result = await reqCartList()
      console.log('cartList:')
      console.log(result)
      if (result.code === 200) {
        commit('CARTLIST', result.data)
      }
    },
    // 将某一商品移除购物车
    async deleteCartList({ commit }, skuId) {
      const result = await reqDeleteCartById(skuId)
      if (result.code === 200) {
        commit('DELETECARTLIST', result.data)
      }
    },
    // 更改商品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
      const result = await reqUpdateCheckedById(skuId, isChecked)
      if (result.code === 200) {
        commit('UPDATECHECKEDBYID', result.data)
      }
    },
    // 将选中的商品批量移除购物车
    deleteAllCheckedCart({ dispatch, getters }) {
      // console.log(context)
      const list = getters.cartList.cartInfoList
      const PromiseAll = []
      list.forEach(item => {
        if (item.isChecked) {
          const promise = dispatch('deleteCartList', item.skuId)
          // 将每一次返回的promise添加到辅助数组中
          PromiseAll.push(promise)
        }
        // Promise.all函数的参数为一个数组，数组中的元素都是promise实例
        // 当这些promise实例的状态全部为fulfilled，则返回fulfilled
        // 本质是一个“与”问题
      })
      return Promise.all(PromiseAll)
    },
    // 全选业务
    allUpdateChecked({ dispatch, getters }, checked) {
      checked = checked ? '1' : '0'
      const list = getters.cartList.cartInfoList
      const PromiseAll = []
      list.forEach(item => {
        const promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked: checked })
        PromiseAll.push(promise)
      })
      return Promise.all(PromiseAll)
    }

  },
  // 计算属性，为了简化仓库的数据而生
  getters: {
    // cartList在后台的数据格式不完美（嵌套了好几层）
    // 所以我们在使用之前要简化它
    cartList(state) {
      return state.cartList[0] || {}
    }
  }
}
