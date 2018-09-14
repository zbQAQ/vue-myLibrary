<template>
  <div class="main" >
    
    <!-- <h1>{{msg}}</h1> -->

    <div class="headimg">
      <img src="../../assets/banner1.jpg" alt="">
    </div>

    <div class="content">

      <div class="newsUl">
        <div class="newli" v-for="(item,index) in newstlist">
          <div class="thumb">
            <img :src=" 'http://localhost/laravel-blog/' + item.art_thumb " alt="">  
          </div>
          <div class="info">

            <div class="title"> <a href="#" v-html="item.art_title"></a> </div>
            <div class="desc">
              <a href="#" v-html="item.art_description"></a>
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
      newstlist: []
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    getArticle() {
      this.$axios.get('api/getArticle')
      .then((res)=>{
        if(res.data.msg === 'success' && res.data.status === 1) {
          this.newstlist = res.data.data
          // console.log(this.newstlist)
        }
      }).catch((res)=>{
        console.log(res); //暂时
      })
    }
  },
}
</script>

<style scoped>
  @import "./newslist.css";
</style>
