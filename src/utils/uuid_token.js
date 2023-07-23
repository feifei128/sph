import { v4 as uuidv4 } from 'uuid'

// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  // 首先，先从本地存储获取uuid（有的话）
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  // 其次，没有的话就生成它
  if (!uuidToken) {
    uuidToken = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  return uuidToken
}
