import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

// Mock数据：第一参数为请求地址，第二参数为请求数据

// 首页轮播图
Mock.mock('/mock/banner', { code: 200, data: banner })
// 家用电器等楼层
Mock.mock('/mock/floor', { code: 200, data: floor })

// 接下来去入口文件引入，不用对外暴露
