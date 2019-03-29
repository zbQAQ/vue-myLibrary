<template>
  <div class="main">

    <div class="headimg">
      <img src="static/img/banner1.jpg" alt="">
    </div>

    <div class="content">

      <loading v-if="isLoading"></loading> 
      <div class="newview" v-if="!isLoading">
        <div class="title">{{news.title}}</div>
        <div class="info">
          <ul>
            <li><i class="fa fa-pencil"></i>作者：<span>{{news.editor}}</span></li>
            <li><i class="fa fa-eye"></i>时间：<span>{{news.time_formatting}}</span></li>
          </ul> 
        </div>
        <!-- <div class="thumb">
          <img alt="" :src="news.art_thumb">
        </div> -->
        <div class="newcon" v-html="news.content">
          <!-- more text -->
        </div>

      </div>
    </div>

    <goback path="/news/newslist">返回新闻列表</goback>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'news',
  data(){
    return {
      msg: 'news',
      isLoading: true,
    }
  },
  async created() {
    await this.getNews({
      id: this.$route.query.newsId, //传 id
      $router: this.$router //传 router对象 vuex里需要操作路由跳转
    })
    this.isLoading = false
  },
  methods: {
    ...mapActions([
      'getNews'
    ]),
    unescape(html) {
      var s = "";
      if (html.length == 0) return "";
      s = html.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "'");
      s = s.replace(/&quot;/g, '"');
      s = s.replace(new RegExp("</p >", "gm"), "</p ><br />");
      s = s.replace(
        new RegExp('"/alucard263096/ariesmall/upload/', "gm"),
        '"' + "https://cmsdev.app-link.org/alucard263096/ariesmall/upload/"
      );
      
      return s;
    }
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
.main .content .newview .newcon p,
.main .content .newview .newcon img {
  margin-bottom: 12px;
}
.main .content .newview .newcon p,
.main .content .newview .newcon .img {
  margin-bottom: 12px;
}
.main .content .newview .newcon .img {
  text-align: center;
}
.main .content .newview .newcon .img .cntImg {
  width: auto;
  height: auto;
  margin: 15px auto;
  border-radius: 2px;
}
.main .content .newview .newcon h4 {
  font-weight: 700;
  margin-bottom: 25px;
  font-size: 20px;
}
.main .content .newview .newcon .ind3 {
  text-indent: 3em;
}
.main .content .newview .newcon .ind4 {
  text-indent: 4em;
}
.main .content .newview .newcon .ind5 {
  text-indent: 5em;
}
.main .content .newview .newcon .ind6 {
  text-indent: 6em;
}
</style>
