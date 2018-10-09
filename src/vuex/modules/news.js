/**
 * news modules
 */
import * as types from '../mutation-types'
import posts from '@/request/requests'

// initial state
const state = {
  newstlist: [],
  newsinfo: {
    news: [],
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
    const data = await posts.getNewslist()
    commit(types.GET_NEWSLIST, data)
  },
  //获取单个新闻
  async getNews ({ commit }, id) {
    const data = await posts.getNews(id)
    commit(types.GET_ONE_NEWS, data)
  }
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
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
