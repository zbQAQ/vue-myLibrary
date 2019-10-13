import * as types from '../mutation-types'
import posts from '@/request/requests'
// initial state
const state = {
  funcList: []
}
// getters
const getters = {
  funcList: state => state.funcList
}

// actions
const actions = {
  async getFuncList ({ commit }) {
    let data = await posts.getFuncList()
    data.sort((a, b) => a.id - b.id)
    commit(types.CHANGE_FUNC_LIST, data)
  }
}

// mutations
const mutations = {
  [types.CHANGE_FUNC_LIST](state, data) {
    state.funcList = data
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
