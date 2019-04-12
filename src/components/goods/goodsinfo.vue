<template>
  <div class="main" >
    
    <!-- <h1>{{msg}}</h1> -->

    <div class="headimg">
      <img src="static/img/banner1.jpg" alt="">
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
              <a href="javascript:;" class="buy-add" @click="addQuan">
                <i class="fa fa-plus"></i>
              </a>
              <input type="text" class="buy-number" :value="quantity" @change="quantityInput" @keydown.enter="quantityInput">
              <a href="javascript:;" class="buy-reduce" @click="reduceQuan">
                <i class="fa fa-minus"></i>
              </a>
            </div>
            <span class="g-stock">库存：{{goods.stock}}</span>
          </div>

          <div class="g-action">
            <a href="javascript:;" class="btn-buy" @click="purchase">
              立即购买
            </a>
            <a href="javascript:;" class="btn-addToCart" @click="addToCart">
              <i class="fa fa-shopping-cart"></i>加入购物车
            </a>
          </div>

        </div>

      </div>

    </div>

    <div class="content pro-content" v-if="!isLoading" >
      <h1 class="title">商品详情</h1>
      <div class="infoContent" v-html="goods.content"></div>
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
      id: 0,
    }
  },
  async created() {
    this.id = this.$route.params.goods_id
    await this.getGoods({
      id: this.id,
      $router: this.$router
    })
    this.changesQuantity(1)
    this.isLoading = false
  },
  methods: {
    ...mapActions([
      'getGoods',
      'doPurchase'
    ]),
    ...mapMutations({
      addQuantity: 'ADD_QUANTITY',
      reduceQuantity: 'REDUCE_QUANTITY',
      changesQuantity: 'CHANGE_QUANTITY'
    }),
    CateToGoodslist() {
      this.$router.push({path:'/goods/goodslist'})
    },
    quantityInput(e) {
      // debugger
      let goods = this.goods
      let num = e.target.value
      // console.log(, 'num')
      if(!isNaN(num) && parseInt(num) > 0) {
        if(parseInt(num) > goods.stock) {
          e.target.value = this.quantity
          // alert('不能超过库存哦')
          this.$toast({msg: '不能超过库存哦', type: 'warn', duration: 2000, position: 'middle'})
        }else {
          this.changesQuantity(num)
        }
      }else {
        e.target.value = this.quantity
        // alert('你输入的值不合法')
        this.$toast({msg: '你输入的值不合法', type: 'warn', duration: 2000, position: 'middle'})
      }
    },
    purchase() {
      let num = this.quantity
      let id = this.id
      var r = confirm('你确定要购买' + num + '件此商品吗？（模拟购买，只会减少库存数）')
      if(r == true) {
        this.doPurchase({id: id, num: num,})
        this.$router.push({path: '/goods/goodslist'})
        this.$toast({msg: '购买成功', type: 'success', duration: 2000, position: 'middle'})
      }
    },
    addToCart() {
      let goods = this.goods
      let shopCart = JSON.parse(sessionStorage.getItem('shopCart') || '[]')
      let isInShopCart = shopCart.find(v => v.id == goods.id)
      if( isInShopCart === undefined) {
        let onceGoods = {
          id: goods.id,
          name: goods.name,
          stock: goods.stock,
          price: parseInt(goods.price).toFixed(2),
          quantity: this.quantity,
          thumb: goods.thumb,
          isChecked: false,
        }
        shopCart.push(onceGoods)
      }else {
        isInShopCart.quantity += this.quantity
      }
      sessionStorage.setItem('shopCart', JSON.stringify(shopCart))
      var r = confirm('商品成功加入购物车，是否跳转到购物车详情?')
      if(r) {this.$router.push({path: '/goods/cart'})}
    },
    addQuan() {
      this.addQuantity(this.$toast)
    },
    reduceQuan() {
      this.reduceQuantity(this.$toast)
    },
  },
  computed: {
    ...mapGetters([
      'goods',
      'quantity'
    ])
  },
}
</script>

<style scoped>
@import "./goodsinfo.css";
.shopCartBox{
  position: fixed;
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
.infoContent >>> img{
  width: 100%;
  max-width: 100%;
}
</style>
