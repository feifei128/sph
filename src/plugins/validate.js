// vee-validate插件：表单验证区域
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 引入中文 message

Vue.use(VeeValidate)

// 表单验证
VeeValidate.Validator.localize('zhCN', {
  messages: {
    ...zhCN.messages,
    is: (field) => '两次输入密码必须一致！' // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: { // 给校验的 field 属性名映射中文名称
    // 此处设置的中文名称将显示在表单的错误提示中
    phone: '手机号码',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '同意协议'
  }
})

// 自定义校验规则
// 定义协议必须打勾同意
VeeValidate.Validator.extend('ischecked', {
  validate: value => value,
  getMessage: field => field + '必须同意'
})

// const success = await this.$validator.validateAll() //全部表单是否验证成功
