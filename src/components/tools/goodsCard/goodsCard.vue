<!--
  独立goods组件
  有个商品 一个组件
-->
<template>
  <!-- <div class="goods-card" v-for="(item, index) in goodslist" :key="index">-->
  <transition
    name="goodsCard"
    mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
  <div class="goods-card">
    <router-link :to="'/goods/goods/' + goods.goods_id" class="imgbox">
      <img :src="'http://localhost/laravel-blog/' + goods.goods_thumb " alt="">
    </router-link>
    <div class="row row-1">
      <div class="g-price"><i class="fa fa-cny"></i>{{goods.goods_price}}</div>
      <div class="g-cate"><span class="span-type">{{goods.goods_cate_name}}</span></div>
    </div>
    <div class="row row-2">
      <router-link :to="'/goods/goods/' + goods.goods_id" class="g-name">{{goods.goods_name}}</router-link>
    </div>
    <div class="row row-3">
      <div class="g-stock">
        <span>库存:</span> {{goods.goods_stock}}
      </div>
      <div class="g-time">{{goods.goods_time}}</div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'goodsCard',
  props: {
    goods: Object,
  },
  data() {
    return {
      msg: 'this is goodsCard component'
    }
  }

}
</script>

<style scoped>
  @import "./goodsCard.css";
</style>
