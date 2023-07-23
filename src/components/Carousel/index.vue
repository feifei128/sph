<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img) in list" :key="img.id">
        <img :src="img.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      // 不论数据有无变化，直接监听。
      // 因为floorList是父组件Home给的，无变化，监听不到
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets', // 分页器类型（小圆点）
              clickable: true // 小圆点是否可点击跳转图片
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar'
            },
            // 切换效果
            // effect: 'cube',
            // 自动轮播
            autoplay: {
              delay: 1500,
              // 新版本的写法：目前是5版本
              // pauseOnMouseEnter: true,
              // 如果设置为true，当切换到最后一个slide时停止自动切换
              stopOnLastSlide: true,
              // 用户操作swiper之后，是否禁止autoplay
              disableOnInteraction: false
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
