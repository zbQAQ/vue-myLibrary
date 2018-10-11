<template>
  <div class="main" >
    
    <!-- <h1>{{msg}}</h1> -->

    <div class="headimg">
      <img src="../../assets/banner1.jpg" alt="">
    </div>

    <div class="content">
      <loading v-if="isLoading"></loading> 
      <div class="pro-box" v-if="!isLoading">

        <div class="g-img">
          <img :src="'http://localhost/laravel-blog/' + goods.goods_thumb" alt="">
        </div>
        <div class="g-info">

          <div class="g-name">{{goods.goods_name}}</div>
          <div class="g-title">{{goods.goods_description}}</div>

          <div class="g-price">
            <span class="g-key">现 价:</span>
            <i class="fa fa-cny"></i>
            <span class="price">{{goods.goods_price}}</span>
          </div>

          <div class="g-sign">
            <div class="g-cate">{{goods.gcate_name}}</div>
            <div class="g-time">{{goods.goods_time | datefmt}}</div>
          </div>

          <div class="g-catedesc">
            <span>更多分类 >> </span>
            <span class="g-toCate" @click="CateToGoodslist(goods.gcate_name)">{{goods.gcate_title}}</span>
          </div>

          <div class="ghr">分割线</div> 

          <div class="g-select">
            <span class="g-key">数 量:</span>
            <div class="g-buynum">
              <a href="javascript:;" class="buy-add">
                <i class="fa fa-plus"></i>
              </a>
              <input type="text" class="buy-number" value="1">
              <a href="javascript:;" class="buy-reduce">
                <i class="fa fa-minus"></i>
              </a>
            </div>
            <span class="g-stock">库存：{{goods.goods_stock}}</span>
          </div>

          <div class="g-action">
            <a href="javascript:;" class="btn-buy">
              立即购买
            </a>
            <a href="javascript:;" class="btn-addToCart">
              <i class="fa fa-shopping-cart"></i>加入购物车
            </a>
          </div>

        </div>

      </div>

    </div>

    <div class="content pro-content" v-if="!isLoading" v-html="goods.goods_content"></div>


  </div>
</template>

<script>
export default {
  name: 'goodsInfo',
  data(){
    return {
      msg: 'goodsInfo',
      goods_id: 0,
      goods: [],
      isLoading: true,
    }
  },
  async created() {
    this.goods_id = this.$route.params.goods_id
    this.goods = await this.getGoods()
    this.isLoading = false
  },
  methods: {
    async getGoods() {
      try {
        const res = await this.$axios.get('api/getGoods/' + this.goods_id)
        if(res.data.status === 1 && res.data.msg === 'success') {
          // console.log(res)
          return res.data.data
        }
        return null
      } catch (e) {
        console.log(e)
        return null
      }
    },
    CateToGoodslist(cate) {
      this.$router.push({path:'/goods/goodslist', query:{cate: cate}})
    },
    goback() {
      this.$router.push({ path: '/goods/goodslist' })
    }
  },
}
</script>

<style scoped>
  @import "./goodsinfo.css";
</style>
