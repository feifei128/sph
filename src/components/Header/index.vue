<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 未登录状态 -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 已登录状态 -->
          <p v-else>
            <span>您好！ {{userName}}</span>
            <a class="register" @click="logout()">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="/" target="_blank">
          <img src="./images/logo.png" alt="">
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    // 搜索按钮的回调函数

    goSearch() {
      // // 写法一：字符串
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      // // 写法二：模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 写法三：对象
      this.$router.push({
        name: 'search',
        params: {
          keyword: this.keyword
        },
        // 可以不判断this.$route.query是否存在，因为可以传空值
        query: this.$route.query
      })
    },
    async logout() {
      try {
        // 通知服务器退出登录
        // 清除用户残留数据 token, userInfo
        await this.$store.dispatch('logout')
        // 退出成功后跳转至首页
        this.$router.push('/')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    // 当搜索词的面包屑被删除时，清空搜索框中的内容
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  },
  computed: {
    // 用户名信息
    userName() {
      return this.$store.state.user.userInfo.name
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  & > .top {
    // background-color: #eaeaea;
    height: 30px;
    line-height: 40px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding-left: 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
