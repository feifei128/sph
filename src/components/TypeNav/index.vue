/* eslint-disable prefer-const */
<template>
  <div class="type-nav">
    <div class="container">
      <div class="leftNav" @mouseleave="leaveColor()" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画（在Search页面触发） -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                <h3 @mouseenter="changeColor(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <!-- 一级分类触发的拓展页 -->
                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                  <!-- 二级分类 -->
                  <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <!-- 三级分类 -->
                      <dd>
                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div> <!-- subitem -->
                </div> <!-- item-list clearfix -->
              </div> <!-- item -->
            </div> <!-- all-sort-list2 -->
          </div> <!-- sort -->
        </transition>
      </div> <!-- leftNav -->
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import _ from 'lodash'
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  // 组件挂载完毕，向服务器发请求
  data() {
    return {
      // 存储用户鼠标移动到哪个一级分类
      currentIndex: -1,
      // show表示三级联动是否显示
      show: true
    }
  },
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库
    // console.log(this.$store)
    // this.$store.dispatch('categoryList')
    // 当离开home主页时，三级联动要自动隐藏
    if (this.$route.name !== 'home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 等号右侧需要一个函数，当使用这个计算属性时，右侧函数会立即执行。
      // 注入大仓库中的数据state
      categoryList: state => {
        return state.home.categoryList
      }
    })
  },
  methods: {
    // 当鼠标移动至一级分类，
    // changeColor(index) {
    //   // ESx6写法，不方便用下划线调用lodash
    //   this.currentIndex = index
    // },
    // eslint-disable-next-line space-before-function-paren
    changeColor: throttle(function (index) {
      this.currentIndex = index
    }, 50), // 节流时间为50ms
    leaveColor() {
      this.currentIndex = -1
      // 当离开home主页时，三级联动要自动隐藏
      if (this.$route.name !== 'home') {
        this.show = false
      }
    },
    goSearch(event) {
      // 问题1 只有点击a标签才触发事件
      // 问题2 如何确定点击的a标签是几级分类
      const element = event.target
      // console.log(element)
      const { categoryname, category1id, category2id, category3id } = element.dataset
      if (categoryname) {
        // 解决问题1
        const locations = {
          name: 'search',
          query: { categoryName: categoryname },
          // 可以不判断this.$route.params是否存在，因为可以传空值
          params: this.$route.params
        }
        if (category1id) {
          locations.query.category1Id = category1id
        } else if (category2id) {
          locations.query.category2Id = category2id
        } else locations.query.category3Id = category3id
        // 路由跳转
        this.$router.push(locations)
      }
    },
    enterShow() {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          // :hover {
          //   background-color: skyblue;
          // }
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }

          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px; // 否则高度随内容变化
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 2px;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #333;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
