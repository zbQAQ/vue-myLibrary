<template>
  <div class="main" >
    
    <!-- <h1>{{msg}}</h1> -->

    <div class="headimg">
      <img src="../../assets/banner1.jpg" alt="">
    </div>

    <div class="content">

      <loading v-if="isLoading"></loading> 
      <div class="newsUl" v-if="!isLoading">
        <div class="newli" v-for="(item, index) in newstlist">
          <div class="thumb">
            <router-link :to="'/news/news/' + item.art_id"><img :src="'http://localhost/laravel-blog/' + item.art_thumb " alt=""> </router-link> 
          </div>
          <div class="info">

            <div class="title"> <router-link :to="'/news/news/' + item.art_id" v-html="item.art_title"></router-link> </div>
            <div class="desc">
              <router-link :to="'/news/news/' + item.art_id" v-html="item.art_description"></router-link>
           </div>

            <div class="otherbox">

              <div class="editer">
                <i class="fa fa-pencil"></i>
                <span class="nkey">作者 : </span>
                <span class="nvalue">{{item.art_editer}}</span>
              </div>

              <div class="otime">
                <i class="fa fa-eye"></i>
                <span class="nkey">发布时间 : </span>
                <span class="nvalue">{{item.art_time | datefmt}}</span>
              </div>

              <div class="views">
                <i class="fa fa-clock-o"></i>
                <span class="nkey">点击数 : </span>
                <span class="nvalue">{{item.art_view}}</span>
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
  name: 'newslist',
  data(){
    return {
      msg: 'newslist',
      newstlist: [],
      isLoading: true
    }
  },
  async created() {
    this.newstlist = await this.getArticle()
    this.isLoading = false
    // console.log(this.newstlist)
  },
  methods: {
    async getArticle() {
      try {
        const res = await this.$axios.get('api/getArticle')
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
  @import "./newslist.css";
</style>
