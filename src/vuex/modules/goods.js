/**
 * goods vuex
 */
import * as types from '../mutation-types'
import posts from '@/request/requests'

// initial state
const state = {
  goodslist: {
    list: [],
    cate: [],
    filter_cate: '全部',
    filter_name: '',
  },
  goodsinfo: {
    goods_id: 0,
    goods: [],
  }
  
}
// getters
const getters = {
  goodslist: state => state.goodslist.list,
  goodscate: state => state.goodslist.cate,
  filter_cate: state => state.goodslist.filter_cate,
  filter_name: state => state.goodslist.filter_name,
  goods_id: state => state.goodsinfo.goods_id,
  goods: state => state.goodsinfo.goods,
}

// actions
const actions = {
  async getGoodslist({ commit }, flag = false) {
    const data = await posts.getGoodslist()
    if(flag){
      return data
    }else{
      commit(types.GET_GOODSLIST, data)
    }
  },
  async getGoodscate({ commit }) {
    const data = await posts.getGoodscate()
    commit(types.GET_GOODS_CATE, data)
  },
  async getGoods({commit}, id) {
    const data = await posts.getGoods(id)
    commit(types.GET_ONE_GOODS, data)
  }
}

// mutations
const mutations = {
  [types.GET_GOODSLIST](state, data) {
    state.goodslist.list = data
  },
  [types.GET_GOODS_CATE](state, data) {
    state.goodslist.cate = data
  },
  [types.CHANGE_FILTER_CATE](state, val) {
    state.goodslist.filter_cate = val
  },
  [types.CHANGE_FILTER_NAME](state, val) {
    state.goodslist.filter_name = val
  },
  [types.GET_ONE_GOODS](state, data) {
    state.goodsinfo.goods = data
  },
  [types.CHANGE_GOODS_ID](state, id) {
    state.goodsinfo.goods_id = id
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
