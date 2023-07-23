
module.exports = {
  // transpileDependencies: true,

  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  },
  // 打包忽略map文件
  productionSourceMap: false

}
