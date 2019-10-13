/**
 * news modules
 */
import * as types from '../mutation-types'
import posts from '@/request/requests'
import mock from '@/request/requests_mock'

// initial state
const state = {
  newstlist: [],
  newsinfo: {
    news: {},
    newsId: 0,
  },
}
// getters
const getters = {
  newstlist: state => state.newstlist,
  news: state => state.newsinfo.news,
  newsId: state => state.newsinfo.newsId
}

// actions
const actions = {
  //获取新闻列表
  async getNewslist ({ commit }) {
    let data = await posts.getNewslist()
    commit(types.GET_NEWSLIST, data)
  },
  //获取单个新闻
  //这里使用mock newslist的新闻 不发起新的请求 
  //从而得到 newslist 获取id 和新闻详情对应 的效果
  async getNews ({ commit }, paramData) {

    let id = paramData.id
    let $router = paramData.$router
    if(id !== null) {
      const data = await posts.getNews(id)
      var s = "";
      if (data.content.length == 0) return "";
      s = data.content.replace(/&amp;/g, "&");
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
      data.content = s
      commit(types.GET_ONE_NEWS, data)
    }else{
      $router.push('/news/newslist')
    }
  },
  

}

// mutations
const mutations = {
  [types.GET_NEWSLIST](state, data) {
    state.newstlist = data
  },
  [types.GET_ONE_NEWS](state, data) {
    state.newsinfo.news = data
  },
  [types.CHANGE_NEWS_ID](state, id) {
    state.newsinfo.newsId = id
  },
  [types.CHANGE_NEWS_VIEW](state, num) {
    state.newsinfo.news.art_view += num
  },
}
export default {
  state,
  getters,
  actions,
  mutations
}
