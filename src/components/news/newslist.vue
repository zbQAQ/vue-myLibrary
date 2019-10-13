<template>
  <div class="main" >
    
    <!-- <h1>{{msg}}</h1> -->

    <div class="headimg">
      <img src="static/img/banner1.jpg" alt="">
    </div>

    <div class="content">

      <loading v-if="isLoading"></loading> 
      <div class="newsUl" v-if="!isLoading">
        <div class="newli" v-for="(item, index) in newstlist" :key="index" @click="goNewsDetail(item.id)">
          <div class="thumb">
            <a href="javascript:;"><img src="static/img/thumb220x.png" alt=""> </a> 
          </div>
          <div class="info">

            <div class="title"> <a href="javascript:;" v-html="item.title"></a> </div>
            <div class="desc">
              <a href="javascript:;" v-html="item.desc"></a>
           </div>

            <div class="otherbox">

              <div class="editer">
                <i class="fa fa-pencil"></i>
                <span class="nkey">作者 : </span>
                <span class="nvalue">{{item.editor}}</span>
              </div>

              <div class="otime">
                <i class="fa fa-eye"></i>
                <span class="nkey">发布时间 : </span>
                <span class="nvalue">{{item.time_formatting}}</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'newslist',
  data(){
    return {
      msg: 'newslist',
      isLoading: true,
    }
  },
  async created () {
    await this.getNewslist()
    this.isLoading = false;
  },
  methods: {
    ...mapActions([
      'getNewslist',
    ]),
    goNewsDetail(id) {
      this.$router.push({path:'/news/newsDetail', query: {newsId: id}})
    }
  },
  computed: {
    ...mapGetters([
      'newstlist'
    ])
  },
}
</script>

<style scoped>
  @import "./newslist.css";
</style>
