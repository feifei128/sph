<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑：带有x的结构 （选项卡）-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级分类的面包屑 (query参数) -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索词的面包屑 (params参数) -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 (请求到的数据) -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- 售卖属性的面包屑 (请求到的数据) -->
            <li class="with-x" v-for="(propsVal,index) in searchParams.props" :key="index">
              {{propsVal.split(':')[1]}}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo='tradeMarkInfo' @attrInfo='attrInfo' />

        <!--details-->
        <div class="details clearfix">
          <!-- 卡条件 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 综合 -->
                <li :class="{ active:isOne }" @click="changeOrder(1)">
                  <a>综合
                    <span v-show="isOne" class="iconfont" :class="{'icon-shangjiantou-':isAsc,'icon-a-xiajiantouzhixiangxiajiantou':!isAsc}">
                    </span>
                  </a>
                </li>
                <!-- 价格 -->
                <li :class="{ active:!isOne }" @click="changeOrder(2)">
                  <a>价格
                    <span v-show="!isOne" class="iconfont" :class="{'icon-shangjiantou-':isAsc,'icon-a-xiajiantouzhixiangxiajiantou':!isAsc}">
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <!-- 商品图片 跳转商品详情页-->
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <!-- 商品价格 -->
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <!-- 商品标题 -->
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                      {{good.title}}
                    </a>
                  </div>
                  <!-- 商品评价 （无数据） -->
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <!-- 商品加购与收藏 -->
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 换页 -->
          <Pagination :pageNo="this.searchParams.pageNo" :pageSize="this.searchParams.pageSize" :total="total" :continue="5" @getPageNo="getPageNo" />
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Search',
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState({ total: state => state.search.searchInfo.total }),
    isOne() {
      return this.searchParams.order.includes(1)
    },
    isAsc() {
      return this.searchParams.order.includes('asc')
      // return this.searchParams.order.indexOf('asc') !== -1
    }
  },
  data() {
    return {
      searchParams: {
        // 一二三级分类ID和标题
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        // 用户输入的搜索词
        keyword: '',
        // 排序（卡价格等） 初始状态：综合降序
        // 1: asc 综合升序 | 1: desc 综合降序 | 2:asc 价格升序 | 2:desc 价格降序
        order: '1:desc',
        // 分页器参数：当前页数
        pageNo: 1,
        // // 分页器参数：每页最大容量
        pageSize: 5,
        // 平台售卖的商品特定属性
        props: [],
        // 品牌
        trademark: ''
      }
    }
  },
  components: {
    SearchSelector
  },
  beforeMount() {
    // 对象合并，在服务器为我们派发数据之前把需要传递的参数整理好，服务器会返回查询的数据
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 向服务器发请求，获取Search模块数据（根据参数不同返回不同的数据）
    getData() {
      this.$store.dispatch('searchInfo', this.searchParams)
    },
    removeCategoryName() {
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 地址栏的参数也需要取消，但注意我们只需要删除query参数，要保留搜索框的params参数
      this.$router.replace({ name: 'search', params: this.$route.params })
    },
    removeKeyword() {
      this.searchParams.keyword = ''
      // 清空搜索框中的内容，要传值到header组件
      this.$bus.$emit('clear')
      // 地址栏的参数也需要取消，但注意我们只需要删除params参数，要保留搜索框的query参数
      this.$router.replace({ name: 'search', query: this.$route.query })
    },
    tradeMarkInfo(trademark) {
      // 接收子组件传来的品牌信息，重新发请求并渲染
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },
    removeTradeMark() {
      // 点击品牌面包屑触发事件
      this.searchParams.trademark = ''
      this.getData()
    },
    attrInfo(attr, attrVal) {
      // 接收子组件传来的售卖属性信息，重新发请求并渲染
      // 考虑数组去重，数组中的元素一定要唯一
      const props = `${attr.attrId}:${attrVal}:${attr.attrName}`
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
      this.getData()
    },
    removeProps(index) {
      // 取消售卖属性面包屑
      this.searchParams.props.pop(index)
      // 或者使用 this.searchParams.props.splice(index, 1)
      this.getData()
    },
    changeOrder(num) {
      const initNum = this.searchParams.order.split(':')[0]
      const initSort = this.searchParams.order.split(':')[1]
      if (initNum === num.toString()) {
        // 切换升降序
        this.searchParams.order = `${initNum}:${initSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        // 切换选项综合or价格
        this.searchParams.order = `${num}:desc`
      }
      this.getData()
    },
    getPageNo(p) {
      // 分页器组件传来用户点击的页码p，用这个新的页码重新拉取数据
      this.searchParams.pageNo = p
      this.getData()
    }
  },
  watch: {
    // 监听路由变化，每当用户搜索的内容更新时，再次发请求
    $route(newVal, oldVal) {
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
