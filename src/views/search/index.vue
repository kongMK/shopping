<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"/>

      <van-search show-action placeholder="请输入搜索关键词" v-model="search">
        <template #action>
          <div v-on:click="goSearch(search)">搜索</div>
        </template>
      </van-search>
      <!-- 搜索历史 -->
      <div class="search-history" v-if="history.length > 0">
        <div class="title">
          <span>最近搜索</span>
          <van-icon name="delete-o" size="16" v-on:click="clear"/>
        </div>
        <div class="list">
          <div class="list-item" v-for="(item) in history" v-bind:key="item" v-on:click="goSearch(item)">{{ item }}</div>
        </div>
      </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      history: getHistoryList(), // 历史记录
      search: '' // 输入框的内容
    }
  },
  methods: {
    // 搜索
    goSearch (key) {
      const index = this.history.indexOf(key)
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(key)
      // 持久化搜索历史
      setHistoryList(this.history)
      // 跳转搜索列表页
      this.$router.push(`/searchlist?search=${key}`)
    },
    // 清空历史记录
    clear () {
      this.history = []
      setHistoryList(this.history)
    }
  }
}
</script>

<style lang="less" scoped>
  .search {
    height: 100vh;
    background-color: #efefef;
  }
  .search {
    ::v-deep .van-search {
      background-color: #efefef;
      .van-search__content {
        background-color: #fff;
      }
    }
    ::v-deep .van-search__action {
      background-color: #c21401;
      color: #fff;
      padding: 0 20px;
      border-radius: 0 5px 5px 0;
      margin-right: 10px;
    }
    .title {
      height: 40px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
    }
    .list {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 10px;
      gap: 5%;
    }
    .list-item {
      width: 30%;
      text-align: center;
      padding: 7px;
      background-color: #fff;
      border-radius: 50px;
      font-size: 13px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 10px;
    }
  }
</style>
