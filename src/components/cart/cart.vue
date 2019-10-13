<template>
  <div class="main">
    
    <div class="headimg">
      <img src="../../../static/img/cartBg.png" alt="">
    </div>
    <div class="shopbox">

      <div class="shopItem" v-for="(item, index) of cartList" :key="index">
        <div class="check">
          <input type="checkbox" :checked="item.isChecked" @click="changeOnceChecked({id: item.id})">
        </div>
        <div class="shopInfo">
          <div class="thumb">
            <img :src="'http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/blog/goods/' + item.thumb" alt="">
          </div>
          <div class="shopText">
            <router-link :to="'/goods/goods/' + item.id" class="name">{{item.name}}</router-link>
            <!-- <p class="stock">库存：{{item.stock}}</p> -->
            <div class="price">¥<span>{{parseInt(item.price).toFixed(2)}}</span></div>
            <div class="quantity">
              <a class="add" href="javascript:;" @click="changeQuantity(item.id, 'reduce')">-</a>
              <input type="text" class="tityNum" :value="item.quantity" @change="inputQuantity(item.id, $event)" @keydown.enter="inputQuantity(item.id, $event)">
              <a class="reduce" href="javascript:;" @click="changeQuantity(item.id, 'increase')">+</a>
            </div>
          </div>
        </div>
      </div>

      <div class="noSelected" v-show="!(cartList.length > 0)">
        <p>暂时还没有喜欢的商品...</p>
        <router-link to="/goods/goodslist">去找商品</router-link>
      </div>

      <div class="buyOption">
        <div class="check">
          <input type="checkbox" :checked="allChecked" @click="checkAll(!allChecked)">
          <a href="javascript:;" class="allCheck" @click="checkAll(true)" v-show="!allChecked">全选</a> 
          <a href="javascript:;" class="allCheck" @click="checkAll(false)" v-show="allChecked">取消全选</a> 
          <a href="javascript:;" class="delShop" @click="delShopCart()">删除选中商品</a> 
        </div>
        <div class="optionRigh">
          <div class="total">合计：</div>
          <span class="price">{{total.toFixed(2)}}</span>
          <a href="javascript:;" class="doBtn" @click="purchase">结算 ( {{selected}} )</a>
        </div>
      </div>

    </div>
    <goback>返回</goback>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'cart',
  data() {
    return {
      msg: 'this is cart',
    }
  },
  methods: {
    ...mapMutations({ 
      changeCartList: 'CHANGE_CART_LIST',
      delCartList: 'DELETE_CART_LIST',
      cartAddQuantity: 'CART_ADD_QUANTITY',
      cartReduceQuantity: 'CART_REDUCE_QUANTITY',
      cartInputQuantity: 'CART_INPUT_QUANTITY',
      changeOnceChecked: 'CHANGE_ONCE_CHECKED',
      changeAllChecked: 'CHANGE_ALLCHECKED',
      changeTotal: 'CHANGE_TOTAL',
      changeSelected: 'CHANGE_SELECTED',
    }),
    ...mapActions([
      'buyShopCart'
    ]),
    changeQuantity(id, action) {
      let goods = this.cartList.find(v => v.id == id)
      if(action === 'increase') {
        //点击增加按钮
        if( parseInt(goods.quantity) + 1 <= goods.stock ) {
          this.changeOnceChecked({id: id, flag: true})
          this.cartAddQuantity(id)
        }else {
          // alert('不能超出库存')
          this.$toast({msg: '不能超过库存哦', type: 'warn', duration: 2000, position: 'top'})
        }
      }else {
        //点击减少按钮
        if( goods.quantity - 1 > 0 ) {
          this.cartReduceQuantity(id)
        }else {
          // alert('最少为1哦')
          this.$toast({msg: '最少为1哦', type: 'warn', duration: 2000, position: 'top'})
        }
      }
    },
    inputQuantity(id, e) {
      let goods = this.cartList.find(v => v.id === id)
      let num = e.target.value
      if(!isNaN(num) && parseInt(num) > 0) {
        if(parseInt(num) > goods.stock) {
          // alert('不能超过库存哦')
          this.$toast({msg: '不能超过库存哦', type: 'warn', duration: 2000, position: 'top'})
        }else {
          this.cartInputQuantity({id: id, num: num})
        }
      }else {
        // alert('你输入的值不合法')
        this.$toast({msg: '你输入的值不合法', type: 'warn', duration: 2000, position: 'top'})
      }
      e.target.value = goods.quantity
    },
    checkAll(flag) {
      let list = this.cartList
      let len = this.cartList.length
      for(let i = 0; i < len; i++) {
        this.changeOnceChecked({
          id: list[i].id,
          flag: flag,
        })
      }
      this.changeAllChecked(flag)
    },
    delShopCart() {
      let cartList = this.cartList
      let len = cartList.length
      let willDel = []
      for(let i = 0; i < len; i++) {
        if(cartList[i].isChecked) {
          willDel.push(cartList[i].id)
        }
      }
      if(willDel.length > 0) {
        var r = confirm('你确定要从购物车删除这件商品吗？')
         if(r == true) {
          this.delCartList(willDel)
          this.$toast({msg: '删除成功', type: 'success', duration: 2000, position: 'top'})
         }
      }else {
        this.$toast({msg: '你还有没有选中任何商品', type: 'warn', duration: 2000, position: 'top'})
      }
    },
    async purchase() {
      let num = this.selected
      let list = this.cartList
      let len = list.length
      let wantDoBuy = []
      // debugger
      if(num > 0) {
        var r = confirm('你确定要购买' + num + '件此商品吗？（模拟购买，只会减少库存数）')
        if(r == true) {
          for(let i = 0; i < len; i++) {
            if(list[i].isChecked) {
              wantDoBuy.push(list[i])
            }
          }
          await this.buyShopCart(wantDoBuy)
          this.$router.push({path: '/goods/goodslist'})
          this.$toast({msg: '购买成功', type: 'success', duration: 2000, position: 'top'})
        }
      }else {
        // alert('你还没有选中任何商品!')
        this.$toast({msg: '你还没有选中任何商品', type: 'warn', duration: 2000, position: 'top'})
      }
    },
  },
  created() {
    let shopCart = JSON.parse(sessionStorage.getItem('shopCart') || '[]')
    this.changeCartList(shopCart)
  },
  destroyed() {
    // let strGoods = JSON.stringify(this.cartList)
    // sessionStorage.setItem('shopCart', strGoods)
  },
  computed: {
    ...mapGetters([
      'cartList',
      'total',
      'allChecked',
      'selected'
    ])
  },
  watch: {
    cartList: {
      deep: true,
      handler: function(newVal, oldVal) {
        // debugger
        let list = this.cartList
        let len = list.length
        let sum = 0
        let selected = []
        let selQuantity = 0
        for(let i = 0; i < len; i++) {
          if(list[i].isChecked) {
            selected.push(1)
            sum += list[i].quantity * list[i].price
            selQuantity += list[i].quantity
          }
        }
        if(len > 0 && selected.length === len) {
          this.changeAllChecked(true)
        }else {
          this.changeAllChecked(false)
        }
        this.changeTotal(sum)
        this.changeSelected(selQuantity)

        let strGoods = JSON.stringify(list)
        sessionStorage.setItem('shopCart', strGoods)

      }
    }
  }
}
</script>

<style scoped>
@import './cart.css';
</style>
