
<template>
  <div>
    <!-- Header -->
    <Header></Header>
    <!-- Body -->
    <router-view></router-view>
    <!-- Footer -->
    <!--  Footer只在Home和Search中显示，在Register和Login中隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 派发三级联动的列表数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less" scoped>
</style>
