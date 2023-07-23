// 对Axios进行二次封装

import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
  // 基础路径
  baseURL: '/api',
  // 请求超时的时间，单位为ms
  timeout: 3000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  // config是配置对象，有一个header请求头属性
  if (store.state.detail.uuid_token) {
    // 仓库请求数据只能带最多两个参数，而加购模块已经传了两个参数
    // 要想把用户id传参，只能通过请求头传
    // 为请求头添加一个字段，和后台同事共同商量好命名，此处叫userTempId
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if (store.state.user.token) {
    // 将token按上述方法写入请求头带给服务器
    config.headers.token = store.state.user.token
  }
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 成功的回调
  nprogress.done()
  return res.data
// eslint-disable-next-line node/handle-callback-err
}, (error) => {
  // 失败的回调
  console.log('响应失败' + error)
  return Promise.reject(new Error('fail'))
})

// 对外暴露
export default requests
