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
  >
  <div class="goods-card">
    <router-link :to="'/goods/goods/' + goods.id" class="imgbox">
      <img :src="'http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/blog/goods/' + goods.thumb" alt="">
    </router-link>
    <div class="row row-1">
      <div class="g-price"><i class="fa fa-cny"></i>{{goods.price}}</div>
      <div class="g-cate"><span class="span-type">{{goods.cate}}</span></div>
    </div>
    <div class="row row-2">
      <router-link :to="'/goods/goods/' + goods.id" class="g-name">{{goods.name}}</router-link>
    </div>
    <div class="row row-3">
      <div class="g-stock">
        <span>库存:</span> {{goods.stock}}
      </div>
      <div class="g-time">{{goods.created_date}}</div>
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
