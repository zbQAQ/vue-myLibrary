import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import news from './modules/news'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  actions,
  getters,
  // 组合各个模块
  modules: {
    news,
  }
})
