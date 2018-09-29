<template>
  <div class="main" >
    
    <!-- <h1>{{msg}}</h1> -->

    <div class="headimg">
      <img src="../../assets/banner1.jpg" alt="">
    </div>

    <div class="content">
      <!-- {{goods_id}}
      <loading v-if="isLoading"></loading> -->

      <div class="pro-box">

        <div class="g-img">
          <img src="../../assets/goodsTest.jpg" alt="">
        </div>
        <div class="g-info">

          <div class="g-name"></div>
          <div class="g-title"></div>

          <div class="g-sign">
            <div class="g-price"></div>
            <div class="g-time"></div>
          </div>
          
          <div class="g-cate"></div>

          <div class="ghr"></div> 

          <div class="g-select">
            <div class="g-buynum"></div>
            <div class="g-stock"></div>
          </div>

          <div class="buybtn"></div>

        </div>

      </div>

    </div>

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
      isLoading: true
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
    goback() {
      this.$router.push({ path: '/goods/goodslist' })
    }
  },
}
</script>

<style scoped>
  @import "./goodsinfo.css";
</style>
