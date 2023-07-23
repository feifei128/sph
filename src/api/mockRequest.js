// 对Axios进行二次封装

import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  // 基础路径
  baseURL: '/mock',
  // 请求超时的时间，单位为ms
  timeout: 3000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  // config配置对象，有一个header请求头属性
  nprogress.start()
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
