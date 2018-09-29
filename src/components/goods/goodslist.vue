<template>
  <div class="main" >
    
    <!-- <h1>{{msg}}</h1> -->

    <div class="headimg">
      <img src="../../assets/banner1.jpg" alt="">
    </div>

    <div class="content">

      <loading v-if="isLoading"></loading>
      <div class="show-flag" v-if="!isLoading">
        <div class="catebox">
          <ul>
            <li class="active"><a href="">全部</a> </li>
            <li class=""><a href="">衣服</a></li>
            <li class=""><a href="">衣服</a></li>
            <li class=""><a href="">衣服</a></li>
            <li class=""><a href="">衣服</a></li>
            <li class=""><a href="">衣服</a></li>
            <li class=""><a href="">衣服</a></li>
          </ul>
        </div>

        <div class="searchbox">
          <div class="search">
            <input type="text" class="search-input">
            <a href="#"><i class="fa fa-search"></i></a>
          </div>
        </div>

        <div class="goodsbox">

          <div class="goods">

            <div class="goods-card" v-for="(item, index) in goodslist">

              <router-link :to="'/goods/goods/' + item.goods_id" class="imgbox">
                <img :src="'http://localhost/laravel-blog/' + item.goods_thumb " alt="">
              </router-link>
              <div class="row row-1">
                <div class="g-price"><i class="fa fa-cny"></i>{{item.goods_price}}</div>
                <div class="g-cate"><span class="span-type">{{item.goods_cate_name}}</span></div>
              </div>
              <div class="row row-2">
                <router-link to="" class="g-name">{{item.goods_name}}</router-link>
              </div>
              <div class="row row-3">
                <div class="g-stock">
                  <span>库存:</span> {{item.goods_stock}}
                </div>
                <div class="g-time">{{item.goods_time}}</div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'goodslist',
  data(){
    return {
      msg: 'goodslist',
      goodslist: [],
      isLoading: true
    }
  },
  async created() {
    this.goodslist = await this.getGoodslist()
    this.isLoading = false
  },
  methods: {
    async getGoodslist() {
      try {
        const res = await this.$axios.get('api/getGoodslist')
        if(res.data.status === 1 && res.data.msg === 'success') {
          // console.log(this)
          return res.data.data
        }
        return null
      } catch (e) {
        console.log(e)
        return null
      }
      
    }
  },
}
</script>

<style scoped>
  @import "./goodslist.css";
</style>
