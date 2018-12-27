<template>
  <div class="main">

    <div class="headimg">
      <img src="../../assets/banner1.jpg" alt="">
    </div>

    <div class="content">

      <loading v-if="isLoading"></loading> 
      <div class="newview" v-if="!isLoading">
        <div class="title">{{news.art_title}}</div>
        <div class="info">
          <ul>
            <li><i class="fa fa-pencil"></i>作者：<span>{{news.art_editor}}</span></li>
            <li><i class="fa fa-eye"></i>时间：<span>{{news.art_time | datefmt}}</span></li>
            <li><i class="fa fa-clock-o"></i>阅读数: <span>{{news.art_view}}</span></li>
          </ul> 
        </div>
        <div class="thumb">
          <img alt="" :src="news.art_thumb">
        </div>
        <div class="newcon" v-html="news.art_content">
          <!-- more text -->
          
        </div>

      </div>
    </div>

    <goback path="/news/newslist">返回新闻列表</goback>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'news',
  data(){
    return {
      msg: 'news',
      isLoading: true,
    }
  },
  async created() {
    this.getId(this.$route.params.art_id)
    await this.getNews({
      id: this.newsId, //传 id
      $router: this.$router //传 router对象 vuex里需要操作路由跳转
    })

    this.isLoading = false


  },
  methods: {
    ...mapActions([
      'getNews'
    ]),
    ...mapMutations({
      getId: 'CHANGE_NEWS_ID',
    }),
  },
  computed: {
    ...mapGetters([
      'news',
      'newsId',
    ])
  }
}
</script>

<style scoped>
  @import "./news.css";
</style>
