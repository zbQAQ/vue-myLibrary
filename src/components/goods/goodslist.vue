<template>
  <div class="main" >
    
    <!-- <h1>{{msg}}</h1> -->

    <div class="headimg">
      <img src="../../assets/banner1.jpg" alt="">
    </div>

    <div class="content">

      
      <div class="show-flag" >
        <div class="catebox">
          <ul>
            <li v-for="(item, index) in goodscate" :key="index" 
              :class="{active: item === filter_cate}"
              @click="doCateFill(item)"
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
          <div class="goods" v-if="!isLoading">
            <div class="goods-null" v-show="goodslist.length < 1">
              <p>好像没有相关商品哦...</p>
            </div>  
            
            <goods-card v-for="(item, index) in goodslist" :key="index" :goods="item"></goods-card>

          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import goodsCard from '@/components/tools/goodsCard/goodsCard'
export default {
  name: 'goodslist',
  data(){
    return {
      msg: 'goodslist',
      goodslist: [],
      goodscate: [],
      isLoading: true,
      filter_cate: '全部',
      filter_name: '',
    }
  },
  async created() {
    this.goodslist = await this.getGoodslist()
    this.goodscate = await this.getGoodscate()
    if(this.$route.query.cate) {
      this.filter_cate = this.$route.query.cate
    }
    this.isLoading = false
  },
  methods: {
    strToArray(text) {
      return Array.prototype.slice.call(text);
    },
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
      
    },
    async getGoodscate() {
      try {
        const res = await this.$axios.get('api/getGoodscate')
        if(res.data.status === 1 && res.data.msg === 'success') {
          // console.log(this)
          let data = res.data.data
          let filter = ['全部'] //默认第一个是全部
          for(let v of data) {  //将获取到的商品分类处理 只需要分类名称
            filter.push(v.gcate_name)
          }
          return filter
        }
        return null
      } catch (e) {
        console.log(e)
        return null
      }
    },
    async doCateFill(cate) {
      this.isLoading = true
      this.filter_cate = cate
      let goodslist = this.goodslist
      const list = await this.getGoodslist()
      this.goodslist = list.filter( (val) => {
        if(this.filter_cate === '全部') {
          return true
        }
        return val.goods_cate_name === this.filter_cate
      })
      this.filter_name = ''
      this.isLoading = false
    },
    async doNameFill() {
      this.isLoading = true
      const fname = this.strToArray(this.filter_name.replace(/^\s*|\s*$/g,""))
      const list = await this.getGoodslist()
      if(fname.length <= 0) {
        return;
      }
      this.goodslist = list.filter( (val) => {
        for(let v of fname) {
          return val.goods_name.includes(v)
        }
      })
      this.filter_cate = '全部'
      this.isLoading = false
    }
  },
  components: {
    'goods-card': goodsCard
  },
  watch: {
    filter_cate(newval, oldval) {
      // console.log(newval, oldval)
      this.doCateFill(newval)
    }
  }
}
</script>

<style scoped>
  @import "./goodslist.css";
</style>
