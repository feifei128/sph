<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- 订单列表 -->
    <div class="orders">
      <table class="order-item" v-for="order in myorder.records" :key="order.id">
        <!-- 订单头 -->
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle">{{order.createTime}} 订单编号：{{order.outTradeNo}} <span class="pull-right delete"><img src="../images/delete.png"></span></span>
            </th>
          </tr>
        </thead>
        <!-- 订单内容 -->
        <tbody v-for="good in order.orderDetailList" :key="good.id">
          <tr>
            <td width="60%">
              <div class="typographic">
                <img :src="good.imgUrl" style="width:80px;height:80px">
                <a :href="`/detail/${good.skuId}`" class="block-text" target="blank">{{good.skuName}}</a>
                <span>x{{good.skuNum}}</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <td rowspan="2" width="8%" class="center">{{order.consignee}}</td>
            <td rowspan="2" width="13%" class="center">
              <ul class="unstyled">
                <li>总金额 ¥{{good.orderPrice}}</li>
                <li>在线支付</li>

              </ul>
            </td>
            <td rowspan="2" width="8%" class="center">
              <a href="#" class="btn" @click="openQRCode(order.id)">{{order.orderStatusName}} </a>
            </td>
            <td rowspan="2" width="13%" class="center">
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>

              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页器 -->
    <div class="choose-order">
      <div class="pagination">
        <Pagination :pageNo="page" :pageSize="limit" :total="myorder.total" :continue="5" @getPageNo="getPageNo" />

      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { mapGetters } from 'vuex'
export default {
  name: 'myOrder',
  data() {
    return {
      // 订单列表当前页码
      page: 1,
      // 每页最大容量
      limit: 3,
      myorder: {},
      code: ''
    }
  },
  computed: {
    ...mapGetters(['payInfo', 'payStatus'])
  },
  mounted() {
    this.getData()
    this.getPayInfo()
  },
  methods: {
    async getData() {
      const result = await this.$API.reqMyOrderList(this.page, this.limit)
      if (result.code === 200) {
        console.log('MyOrderList: ')
        console.log(result)
        this.myorder = result.data
      }
    },
    // 获取订单支付信息
    async getPayInfo() {
      await this.$store.dispatch('getOrderPayInfo', this.orderId)
    },
    // 创建弹框，用于支付二维码
    async openQRCode(orderId) {
      // 1. 生成一个二维码URL

      const url = await QRCode.toDataURL(this.payInfo.codeUrl)

      // 2. 创建弹框
      // 第一个参数:即为内容区域
      // 第二个参数:标题
      // 第三个参数:组件的配置项
      this.$alert(`<img src=${url}>`, '请你微信扫码支付', {
        dangerouslyUseHTMLString: true, // 将字符串转换为标签
        center: true, // 居中
        showClose: false, // 右上角的关闭按钮不显示
        confirmButtonText: '支付成功', // 确定按钮的文本
        showCancelButton: true, // 显示取消按钮
        cancelButtonText: '支付遇见问题', // 取消按钮的文本
        closeOnClickModal: true, // 点击遮罩层关闭messagebox

        // 4. 若用户手动点击“已支付”，判断该行为是否合法
        beforeClose: (action, instance, done) => {
          // 在消息盒子关闭之前会触发
          // action参数:可以区分用户点击的是取消【cancel】、确定【confirm】
          // instance参数:当前消息框组件VC
          // done参数：是一个函数,函数可以关闭消息盒子
          console.log('this.code= ' + this.code)

          if (action === 'confirm' && this.code === 200) {
            console.log('点击“已支付”，且支付成功')
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
            // 关闭盒子
            done()
            // 路由跳转
            this.$router.push('/center')
          } else if (action === 'cancel' && this.code !== 200) {
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
            // 关闭盒子
            done()
            this.$message.error('支付遇见问题请联系超管豪哥')
          }
        }
      })
      // 查询支付结果,开启定时器每隔一段时间询问支付结果

      // 3. 用定时器判断用户是否支付成功
      // eslint-disable-next-line space-before-function-paren
      this.timer = setInterval(async () => {
        // 发请求获取支付结果
        await this.$store.dispatch('getPayStatus', orderId)
        console.log('支付状态信息：')
        console.log(this.payStatus)

        // 返回数据当中：code=200代表支付成功  code=205未支付
        if (this.payStatus === 200) {
          // 支付成功了
          // 存储一下支付成功的code数值，通过他判断支付是否成功
          this.code = this.payStatus
          // 清除定时器
          clearInterval(this.timer)
          this.timer = null
          // 关闭messagebox
          this.$msgbox.close()
          // 在路由跳转
          this.$router.push('/center')
        } else {
          // 未支付
          this.code = this.payStatus
        }
      }, 2000)
    },
    getPageNo(p) {
      this.page = p
      this.getData()
    }
  }
}
</script>

<style lang="less" >
</style>
