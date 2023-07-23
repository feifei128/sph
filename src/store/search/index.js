// Search模块的小仓库

// 引入封装axios的函数
import { reqSearchInfo } from '@/api'

export default {
  state: {
    searchInfo: {}
  },
  mutations: {
    SEARCHINFO(state, searchInfo) {
      state.searchInfo = searchInfo
    }
  },
  actions: {
    async searchInfo({ state, dispatch, commit }, params) {
      // commit上下文参数，params至少是一个空对象
      const result = await reqSearchInfo(params)
      console.log('searchInfo:')
      console.log(result)
      if (result.code === 200) {
        commit('SEARCHINFO', result.data)
      }
    }
  },
  // 计算属性，为了简化仓库的数据而生
  getters: {
    goodsList(state) {
      // 加||[]是为了当网速太慢时也可以返回空数组，否则就undefined
      return state.searchInfo.goodsList || []
    },
    trademarkList(state) {
      return state.searchInfo.trademarkList || []
    },
    attrsList(state) {
      return state.searchInfo.attrsList || []
    }
  }
}
