module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 配置element-ui
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
