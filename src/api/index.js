import requests from '@/api/request'
import mockRequests from '@/api/mockRequest'

// 1 真正Ajax请求
// 三级联动接口 /api/product/getBaseCategoryList GET请求 无参数
export const reqCategoryList = () => {
  // 发请求
  return requests({
    url: '/product/getBaseCategoryList', // 因为在request.js设置过基础路径/api了
    method: 'GET'
  })
}
// Search模块（地址：/api/list；请求方式：post；有参数）
export const reqSearchInfo = (data) => requests({
  url: '/list',
  method: 'post',
  // post用data，get用params
  data
})
// Detail模块（地址：/api/item/{ skuId }；请求方式：get；有参数）
export const reqDetailInfo = (skuId) => requests({
  url: `/item/${skuId}`,
  method: 'get'
})
// 加购模块（地址：/api/cart/addToCart/{ skuId }/{ skuNum }；请求方式：post；有参数）
export const reqAddCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})
// 购物车--列表ShopCart模块（地址：/api/cart/cartList；请求方式：get；无参数）
export const reqCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})
// 购物车--移除购物车模块（地址：/api/cart/deleteCart/{ skuId }；请求方式：delete；有参数）
export const reqDeleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})
// 购物车--切换商品选中状态模块（地址：/api/cart/checkCart/{skuId}/{isChecked}；请求方式：get；有参数）
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})
// 注册--验证码模块（地址：/api/user/passport/sendCode/{phone}；请求方式：get；有参数）
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})
// 注册--提交模块（地址：/api/user/passport/register；请求方式：post；有参数 phone,password,code）
export const reqUserRegister = (data) => requests({
  url: '/user/passport/register',
  method: 'post',
  data
})
// 登陆模块（地址：/api/user/passport/login；请求方式：post；有参数 phone,password）
export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  method: 'post',
  data
})
// home--token校验获取用户的登录信息模块（地址：http://182.92.128.115/api/user/passport/auth/getUserInfo，请求方式：get）
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})
// 退出登录模块（地址：/api/user/passport/logout；请求方式：get；无参数）
export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})
// Trade模块（地址：/api/order/auth/trade；请求方式：get；无参数）
export const reqTrade = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})
// Trade--用户地址模块（地址：/api/user/userAddress/auth/findUserAddressList；请求方式：get；无参数）
export const reqUserAddressList = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})
// Trade--提交订单模块（地址：/api/order/auth/submitOrder?tradeNo={tradeNo}；请求方式：post；有参数）
export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method: 'post',
  data
})
// Pay模块（地址：/api/payment/weixin/createNative/{orderId}；请求方式：get；有参数）
export const reqOrderPayInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})
// Pay--查询订单支付状态模块（地址：/api/payment/weixin/queryPayStatus/{orderId}；请求方式：get；有参数）
export const reqPayStatus = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})
// myOrder模块（地址：/api/order/auth/{page}/{limit}；请求方式：get；有参数）
export const reqMyOrderList = (page, limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})

//
//
// 2 Mock请求
// 首页轮播图
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' })
// Floor模块
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' })
