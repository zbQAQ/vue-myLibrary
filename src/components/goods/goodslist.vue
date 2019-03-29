<template>
  <div class="main" >

    <div class="headimg">
      <img src="../../../static/img/banner1.jpg" alt="">
    </div>

    <div class="content">

      
      <div class="show-flag" >
        <div class="catebox">
          <ul>
            <li v-for="(item, index) in goodscate" :key="index" 
              :class="{active: item === filter_cate}"
              @click="change_filter_cate(item)"
              >
              <a href="javascript:;">{{item}}</a> 
            </li>
          </ul>
        </div>

        <!-- <div class="searchbox">
          <div class="search">
            <input type="text" class="search-input" placeholder="输入查找的商品名字" v-model="filter_name" @keyup.enter="doNameFill">
            <a href="javascript:;" @click="doNameFill"><i class="fa fa-search"></i></a>
          </div>
        </div> -->

        <div class="goodsbox">
          <loading v-if="isLoading"></loading>
          <transition 
              name="goodsnull"
              mode="out-in"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
            <div class="goods" v-if="!isLoading">

              <div class="goods-null" v-show="isGoods_null">
                <p>好像没有相关商品哦...</p>
                <p class="show-all" @click="change_filter_cate('全部')">显示全部商品</p>
              </div>  
              <goods-card v-for="(item, index) in goodslist" :key="index" :goods="item" v-show="!isGoods_null"></goods-card>

            </div>
          </transition> 
        </div>

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


  </div>
</template>

<script>
import goodsCard from '@/components/tools/goodsCard/goodsCard'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'goodslist',
  data(){
    return {
      msg: 'goodslist',
      isLoading: true,
      isGoods_null: false,
    }
  },
  async created() {
    await this.getGoodslist()
    await this.getGoodscate()
    this.isLoading = false
  },
  methods: {
    ...mapActions({
      getGoodslist: 'getGoodslist',
      getGoodscate: 'getGoodscate',
    }),
    ...mapMutations({
      change_filter_cate: 'CHANGE_FILTER_CATE',
      change_goodslist: 'GET_GOODSLIST',
    }),
    doCateFill(cate) {
      this.isLoading = true
      const filter = this.list.filter( (item) => {
        if(cate === '全部') {
          return true
        }
        return item.cate === cate
      })
      this.isGoods_null = filter.length === 0 ? true : false
      this.change_goodslist(filter)
      // debugger
      setTimeout(() => {
        this.isLoading = false
      }, 0)
    },
  },
  components: {
    'goods-card': goodsCard
  },
  computed: {
    ...mapGetters([
      'list',
      'goodslist',
      'goodscate',
      'filter_cate',
    ]),
  },
  watch: {
    filter_cate: {
      handler(newval, oldval) {
        // console.log(newval, oldval , 'watch filter_cate')
        this.doCateFill(newval)
      },
      // immediate: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log(to, from, 'beforeRouteUpdate in goodslist')

  }
}
</script>

<style scoped>
@import "./goodslist.css";
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
</style>
