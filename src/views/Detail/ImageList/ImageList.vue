<template>
  <div class="swiper-container" ref="Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in skuImageList" :key="img.id">
        <img :src="img.imgUrl" :class="{active:currentIndex==index}" @click="imgZoom(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: ['skuImageList'],
  watch: {
    skuImageList: {
      // 不论数据有无变化，直接监听。
      // 因为floorList是父组件Home给的，无变化，监听不到
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiper = new Swiper(this.$refs.Swiper, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            // 设置一次显示几张图
            slidesPerView: 5
          })
        })
      }
    }
  },
  methods: {
    imgZoom(index) {
      // 点击哪个图片，就将高亮样式应用到哪个图片上，所以需要动态更改index
      this.currentIndex = index
      // 点击哪个图片，将其传到兄弟组件Zoom中，让Zoom显示这张图片
      this.$bus.$emit('imgZoom', index)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
