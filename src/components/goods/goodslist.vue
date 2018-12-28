<template>
  <div class="main" >

    <div class="headimg">
      <img src="../../assets/banner1.jpg" alt="">
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

        <div class="searchbox">
          <div class="search">
            <input type="text" class="search-input" placeholder="输入查找的商品名字" v-model="filter_name" @keyup.enter="doNameFill">
            <a href="javascript:;" @click="doNameFill"><i class="fa fa-search"></i></a>
          </div>
        </div>

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

                <!-- <h1>{{testData.a}}</h1>
            <button @click="testData()" style="margin-bottom: 50px;">click me</button> -->

  </div>
</template>

<script>
import goodsCard from '@/components/tools/goodsCard/goodsCard'
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'goodslist',
  data(){
    return {
      msg: 'goodslist',
      isLoading: true,
      isGoods_null: false,
      testData: {
        a:1
      }
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
      change_filter_name: 'CHANGE_FILTER_NAME',
      change_goodslist: 'GET_GOODSLIST',
    }),
    strToArray(text) {
      return Array.prototype.slice.call(text);
    },
    async doCateFill(cate) {
      this.isLoading = true
      // this.filter_cate = cate
      const list = await this.list
      const filter = list.filter( (val) => {
        if(this.filter_cate === '全部') {
          return true
        }
        return val.goods_cate_name === this.filter_cate
      })
      this.change_goodslist(filter)
      this.change_filter_name('')
      this.isLoading = false
    },
    async doNameFill() {
      this.isLoading = true
      const fname = this.strToArray(this.filter_name.replace(/^\s*|\s*$/g,""))
      // const list = await this.getGoodslist()
      if(fname.length <= 0) {
        alert('请输入有效字段')
        this.isLoading = false
        return;
      }
      const filter = this.goodslist.filter( (val) => {
        for(let v of fname) {
          return val.goods_name.includes(v)
        }
      })
      this.change_goodslist(filter)
      this.isLoading = false
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
      'filter_name',
    ]),
    filter_name: {
      get() {
        return this.$store.state.goods.goodslist.filter_name
      },
      set(value) {
        this.change_filter_name(value)
      }
    }
  },
  watch: {
    filter_cate(newval, oldval) {
      // console.log(newval, oldval)
      this.doCateFill(newval)
    },
    goodslist(newval, oldval) {
      if(newval.length < 1) {
        this.isGoods_null = true
      }else{
        this.isGoods_null = false
      }
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
</style>
