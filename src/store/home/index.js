// home模块的小仓库

// 引入封装axios的函数
import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'

export default {
  state: {
    categoryList: [],
    bannerList: [],
    floorList: []
  },
  mutations: {
    CATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
      state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
      state.floorList = floorList
    }
  },
  actions: {
    async categoryList({ commit }) {
      const result = await reqCategoryList()
      console.log('categoryList:')
      console.log(result)
      if (result.code === 200) {
        commit('CATEGORYLIST', result.data)
      }
    },
    async bannerList({ commit }) {
      const result = await reqBannerList()
      console.log('bannerList:')
      console.log(result)
      if (result.code === 200) {
        commit('BANNERLIST', result.data)
      }
    },
    async floorList({ commit }) {
      const result = await reqFloorList()
      console.log('floorList:')
      console.log(result)
      if (result.code === 200) {
        commit('FLOORLIST', result.data)
      }
    }
  },
  getters: {}
}
