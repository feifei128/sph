<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'Zoom',
  data() {
    return {
      index: 0
    }
  },
  props: ['skuInfo'],
  computed: {
    // ...mapGetters(['skuInfo']),
    imgObj() {
      // 防止加报错，当服务器的数据还没有返回来（skuInfo），则为undefined
      const skuImageList = this.skuInfo.skuImageList || []
      return skuImageList[this.index] || {}
    }
  },
  mounted() {
    // 接收兄弟组件ImageList传来的图片地址，即用户点击的轮播图
    this.$bus.$on('imgZoom', index => {
      this.index = index
    })
  },
  methods: {
    handler(event) {
      const mask = this.$refs.mask
      const big = this.$refs.big
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2

      // 建立约束，蒙版不能超过外面元素的边界
      if (left < 0) left = 0
      if (top < 0) top = 0
      if (left > mask.offsetWidth) left = mask.offsetWidth
      if (top > mask.offsetHeight) top = mask.offsetHeight
      // 修改元素的位置
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'

      // 修改big图：看起来big图在随着鼠标移动蒙版而移动，但其实big图的div一直在原地，是图片本身在移动
      // 当蒙版随着鼠标右移，将蒙版视作参照物，big图相当于是向左移的，所以要负数
      big.style.left = -2 * left + 'px'
      big.style.top = -2 * top + 'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
