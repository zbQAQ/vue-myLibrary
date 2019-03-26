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
          <img :src="'http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/blog/goods/' + goods.thumb" alt="">
        </div>
        <div class="g-info">

          <div class="g-name">{{goods.name}}</div>
          <div class="g-title">{{goods.desc}}</div>

          <div class="g-price">
            <span class="g-key">现 价:</span>
            <i class="fa fa-cny"></i>
            <span class="price">{{goods.price}}</span>
          </div>

          <div class="g-sign">
            <div class="g-cate">{{goods.cate}}</div>
            <div class="g-time">{{goods.created_date}}</div>
          </div>

          <div class="g-catedesc">
            <span @click="CateToGoodslist()">{{goods.cateDesc}}</span>
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
            <span class="g-stock">库存：{{goods.stock}}</span>
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

    <div class="content pro-content" v-if="!isLoading" >
      <h1 class="title">商品详情</h1>
      <div v-html="goods.content"></div>
      <div class="copyTips">
        内容均取自淘宝, 无商业用途
      </div>
    </div>

    <div class="shopCartBox">
      <div class="shopCart">
        <router-link to="/goods/cart" alt="返回商品列表">
          <!-- <span>返回商品列表</span> -->
          <i class="fa fa-shopping-cart"></i>
        </router-link>
      </div>
    </div>
    <goback path="/goods/goodslist">返回商品列表</goback>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'goodsInfo',
  data(){
    return {
      msg: 'goodsInfo',
      isLoading: true,
    }
  },
  async created() {
    this.getGoods_id(this.$route.params.goods_id)
    await this.getGoods({
      id: this.goods_id,
      $router: this.$router
    })
    this.isLoading = false
  },
  methods: {
    ...mapActions([
      'getGoods'
    ]),
    ...mapMutations({
      getGoods_id: 'CHANGE_GOODS_ID',
    }),
    CateToGoodslist() {
      this.$router.push({path:'/goods/goodslist'})
    },
  },
  computed: {
    ...mapGetters([
      'goods',
      'goods_id'
    ])
  },
}
</script>

<style scoped>
@import "./goodsinfo.css";
.shopCartBox{
  position: absolute;
  right: 3%;
  bottom: 150px;
  z-index: 999;
}
.shopCartBox .shopCart{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
  box-shadow: 1px 1px 10px -1px #999;
}
.shopCartBox .shopCart a{
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 38px;
  font-size: 16px;
  text-align: center;
  /* margin-left: -1px; */
  color: #666;
  transition: 0.2s ease-in;
}
.shopCartBox .shopCart a:hover {
  color: #fff;
  background: #64abe9;
}
</style>
