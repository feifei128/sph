import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { mapState, mapGetters } from 'vuex'
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
import lazyloadimg from '@/assets/images/lazyload.jpg'

import '@/mock/mockServe.js'
import 'swiper/css/swiper.min.css'
import '@/plugins/validate'

// 引入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'

// 注册方法一：全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.component(MessageBox.name, MessageBox)

// 注册方法二：挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 接口测试
// const result = reqCategoryList()
// console.log(result)
Vue.config.productionTip = false

// 注册插件
Vue.use(VueLazyload, {

  loading: lazyloadimg // 懒加载时显示的加载图像

})

new Vue({
  router,
  store,
  mapState,
  mapGetters,
  render: h => h(App),
  // 全局事件总线bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    // 将全部请求函数挂载到原型对象上
    Vue.prototype.$API = API
  }
}).$mount('#app')
