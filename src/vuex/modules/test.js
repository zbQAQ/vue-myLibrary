/**
 * test vuex
 */
import * as types from '../mutation-types'

// initial state
const state = {
  num: 0
}
// getters
const getters = {
  num: state => state.num
}

// actions
const actions = {
  async changeNumber ({ commit }, init) {
    commit('test', init)
  }
}

// mutations
const mutations = {
  test(state, init) {
    state.num += init
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
