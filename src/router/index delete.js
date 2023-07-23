import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import store from '@/store'
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'

Vue.use(VueRouter)

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) originPush.call(this, location, resolve, reject)
  else originPush.call(this, location, () => {}, () => {})
}
// 设置路由
const routes = [
  { // home
    path: '/',
    name: 'home',
    component: Home,
    meta: { show: true }
  },
  { // login
    path: '/login',
    name: 'login',
    component: Login,
    meta: { show: false }
  },
  { // register
    path: '/register',
    name: 'register',
    component: Register,
    meta: { show: false }
  },
  { // search
    path: '/search/:keyword?',
    name: 'search',
    component: Search,
    meta: { show: true },
    props: true
  },
  { // detail
    // 跳转到商品详情页面时要将商品id作为params参数进行传递
    path: '/detail/:skuid',
    name: 'detail',
    component: Detail,
    meta: { show: true }
  },
  { // addCartSuccess
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: AddCartSuccess,
    beforeEnter: (to, from, next) => {
      if (from.name === 'detail') next()
      else next(false)
    }
  },
  { // shopcart
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart,
    meta: { show: true }
  },
  { // trade
    path: '/trade',
    name: 'trade',
    component: Trade,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') next()
      else next(false)
    }
  },
  { // pay
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: { show: true }
  },
  { // paysuccess
    path: '/paysuccess',
    name: 'paysuccess',
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') next()
      else next(false)
    }
  },
  { // center
    path: '/center',
    name: 'center',
    component: Center,
    meta: { show: true },
    children: [{ // myOrder -- 二级导航
      path: 'myorder',
      name: 'myOrder',
      component: MyOrder
    },
    { // GroupOrder -- 二级导航
      path: 'grouporder',
      name: 'groupOrder',
      component: GroupOrder
    },
    { // 重定向，打开center页直接显示二级路由，否则从其他页面跳转到center时右侧是空的
      path: '/center',
      redirect: '/center/myOrder'
    }]
  }

]
// 定义VueRouter类的实例
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
// 全局前置导航
router.beforeEach(async(to, from, next) => {
  // from：跳转前地址
  // to： 将要跳转到哪个地址
  // next：放行函数 ↓
  // next() 直接放行 | next('path') 放行到指定路径 | next(false) 取消放行，返回from地址
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  console.log('守卫前： token = ' + token + '; name = ' + name)

  if (token) { // 用户登录过，但不知道token正在生效还是已失效
    if (to.path === '/login' && !name) {
      await store.dispatch('userInfo')
      next()
    } else if (to.path === '/login') { // 若用户已登录还想访问登录页
      next('/') // 直接跳转到首页
    } else { // 已登录过的用户想访问其他页面
      if (name !== undefined) { // token有效
        next()
      } else { // 登陆过却没有用户信息了（刷新了），派发action
        try {
          await store.dispatch('userInfo')
          next() // 重新获取用户信息再放行
          console.log('用户有token，现已重新获取用户信息！')
        } catch (error) { // 不能重新获取用户信息了，token失效，只能清除本地用户信息，重新登录
          await store.dispatch('logout')
          next('/login')
          console.log('token失效，请重新登录！')
        }
      }
    }
  } else { // 若用户未登录（游客），不能放行很多页面，如支付、支付成功等
    // 在一步一步的开发过程中，还无法确定这些页面怎么命名，可以在后续开发过程中“回首掏”
    if (to.path.indexOf('trade') !== -1 || to.path.indexOf('pay') !== -1 || to.path.indexOf('center') !== -1 || to.path.indexOf('shopcart') !== -1) {
      console.log('目标地址禁止游客访问，请登录！')
      next('/login?redirect=' + to.path)
    } else { // 除了必须需要用户信息的页面，其他随便游客随便访问
      next()
    }
  }
})
// 对外暴露
export default router
