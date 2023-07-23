<template>
  <div class="home-container">
    <TypeNav></TypeNav> <!-- 全局组件 -->
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(carousel) in floorList" :key="carousel.id" :floorItem="carousel"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      username: 'zs'
    }
  },
  mounted() {
    // 获取floor组件的数据
    this.$store.dispatch('floorList')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  methods: {},
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand }
}
</script>

<style lang="less"  scoped>
</style>
