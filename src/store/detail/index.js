// Detail模块的小仓库

// 引入封装axios的函数
import { reqDetailInfo, reqAddCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

export default {
  state: {
    detailInfo: {},
    addCart: {},
    uuid_token: getUUID()
  },
  mutations: {
    DETAILINFO(state, detailInfo) {
      state.detailInfo = detailInfo
    },
    ADDCART(state, addCart) {
      state.addCart = addCart
    }
  },
  actions: {
    async detailInfo({ state, dispatch, commit }, params) {
      // commit上下文参数，params至少是一个空对象
      const result = await reqDetailInfo(params)
      console.log('detailInfo:')
      console.log(result)
      if (result.code === 200) {
        commit('DETAILINFO', result.data)
      }
    },
    async addCart({ state, dispatch, commit }, { skuId, skuNum }) {
      const result = await reqAddCart(skuId, skuNum)
      if (result.code === 200) {
        commit('ADDCART', result.data)
      }
    }
  },
  // 计算属性，为了简化仓库的数据而生
  getters: {
    categoryView(state) {
      // 加||[]是为了当网速太慢时也可以返回空数组，否则就undefined
      return state.detailInfo.categoryView || {}
    },
    price(state) {
      return state.detailInfo.price || {}
    },
    skuInfo(state) {
      return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.detailInfo.spuSaleAttrList || {}
    }
  }
}
