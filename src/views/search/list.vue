<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search readonly shape="round" :value="querySearch || '搜索商品'" show-action @click="$router.push('/search')">
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>
    <!-- 排序选项按钮 -->
     <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格</div>
     </div>

     <div class="goods-list">
      <!-- GoodsItem -->
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
      <div v-if="!proList.length" style="text-align: center;">暂无数据</div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/api/product'

export default {
  name: 'SearchList',
  data () {
    return {
      page: 1,
      proList: []
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  },
  async created () {
    const { data: { list } } = await getProList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = list.data
  },
  components: {
    GoodsItem
  }
}
</script>

<style lang="less" scoped>
  .search {
    padding-top: 46px;
    .tool {
      font-size: 24px;
      height: 40px;
      line-height: 40px;
    }
    .sort-btns {
      display: flex;
      height: 36px;
      line-height: 36px;
      .sort-item {
        flex: 1;
        text-align: center;
        font-size: 16px;
      }
    }
    .goods-list {
      background-color: #f6f6f6;
    }
  }
</style>
