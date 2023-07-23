<template>
  <div class="pagination">
    <!-- 上部分 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-show="continuePages[0]>1" @click="$emit('getPageNo',1)">1</button>
    <button v-show="continuePages[0]>2">···</button>

    <!-- 中间部分 连续页码 -->
    <button v-for="pageIndex in continuePages" :key="pageIndex" @click="$emit('getPageNo',pageIndex)" :class="{ active: pageNo == pageIndex }">{{pageIndex}}</button>

    <!-- 下部分 -->
    <button v-show="continuePages[0]<(pages-this.continue)">···</button>
    <button v-show="continuePages[0]<(pages-this.continue+1)" @click="$emit('getPageNo',pages)">{{ pages }}</button>
    <button :disabled="pageNo==pages" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <!-- 总页数 -->
    <button style=" margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
// 使用方法：
// html页面结构：
// <Pagination : pageNo="当前页码" : pageSize="每页最大容量" : total="总页数" : continue="5" @getPageNo="getPageNo" />
// js逻辑
// getPageNo(p) {
//       this.当前页码变量名 = p
//       this.getData()
//     }
//
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continue'],
  computed: {
    pages() {
      // 计算最大页数
      return Math.ceil(this.total / this.pageSize)
    },
    continuePages() {
      // 计算连续页码数组
      const res = []
      if (this.continue < this.pages) {
        if (this.pageNo <= Math.floor(this.continue / 2)) {
          // 防止出现负页数
          for (let i = 0; i < this.continue; i++) res.push(i + 1)
        } else if (this.pageNo >= this.pages - Math.floor(this.continue / 2)) {
          // 防止页码超过最大页数
          for (let i = 0; i < this.continue; i++) res.push(this.pages - this.continue + 1 + i)
        } else {
          for (let i = 0; i < this.continue; i++) res.push(this.pageNo + i - Math.floor(this.continue / 2))
        }
      } else {
        // 异常现象：搜索总页数 < 连续页码数
        for (let i = 0; i < this.pages; i++) res.push(i + 1)
      }
      return res
    }
  }
}
</script>

<style lang="less" >
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #e65614;
      color: #fff;
    }
  }
}
</style>
