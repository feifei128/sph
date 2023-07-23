// 插件
import Vue from 'vue'
import Vuex from 'vuex'

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
import pay from './pay'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  modules: { home, search, detail, shopcart, user, trade, pay },
  namespaced: true // 大仓库添加命名空间
})
