import * as types from '../mutation-types'
import posts from '@/request/requests'
// initial state
const state = {
  collectionList: [],
  filterList: []
}
// getters
const getters = {
  collectionList: state => state.collectionList,
  filterList: state => state.filterList
}

// actions
const actions = {
  async getCollList ({ commit }) {
    let data = await posts.getCollectionList()
    commit(types.CHANGE_COLLECTION, data)
    commit(types.CHANGE_FILTER_COLLECTION, data)
  },
  async addCollList ({ commit }, inputInfo) {
    let data = await posts.addCollection(inputInfo.name, inputInfo.link, inputInfo.label)
    commit(types.CHANGE_COLLECTION, data)
  },
  async delCollList ({ commit }, id) {
    let data = await posts.delCollection(id)
    commit(types.CHANGE_COLLECTION, data)
  }
}

// mutations
const mutations = {
  [types.CHANGE_COLLECTION](state, data) {
    state.collectionList = data
  },
  [types.CHANGE_FILTER_COLLECTION](state, data) {
    state.filterList = data
  },
}
export default {
  state,
  getters,
  actions,
  mutations
}
