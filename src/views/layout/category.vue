<template>
  <div class="category">
    <van-nav-bar title="全部分类" fixed/>
    <!-- 搜索框 -->
     <van-search readonly shape="round" placeholder="请输入搜索关键字" @click="$router.push('/search')" />
    <!-- 分类列表 -->
    <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="(item, index) in list" :key="item.category_id">
            <a :class="{ active: index === activeIndex }" v-on:click="activeIndex = index" href="javascript:;">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="cate-goods" v-for="item in list[activeIndex]?.children" :key="item.category_id" v-on:click="$router.push(`/searchlist?categoryId=${item.category_id}`)">
          <img :src="item.image?.external_url" :alt="item.name">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/category'

export default {
  name: 'CategoryPage',
  data () {
    return {
      list: [],
      activeIndex: 0
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      const { data: { list } } = await getCategoryList()
      this.list = list
    }
  }
}
</script>

<style lang="less" scoped>
  .category {
    height: 100vh;
    padding-top: 100px;
    padding-bottom: 50px;
    .list-box {
      height: 100%;
      display: flex;
      .left {
        width: 85px;
        height: 100%;
        background-color: #f3f3f3;
        overflow: auto;
        a {
          display: block;
          height: 45px;
          line-height: 45px;
          text-align: center;
          color: #444;
          font-size: 12px;
          &.active {
            color: #fb442f;
            background-color: #fff;
          }
        }
      }
      .right {
        flex: 1;
        height: 100%;
        background-color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        overflow: auto;
        .cate-goods {
          width: 33.3%;
          margin-bottom: 10px;
          img {
            display: block;
            width: 70px;
            height: 70px;
            margin: 5px auto;
          }
          p {
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
// 导航条样式定制
.van-nav-bar {
  z-index: 999;
}
// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}
</style>
