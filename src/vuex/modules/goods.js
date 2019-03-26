/**
 * goods vuex
 */
import * as types from '../mutation-types'
import posts from '@/request/requests'
import mock from '@/request/requests_mock'

// initial state
const state = {
  goodslist: {
    list: [],
    cate: [],
    filter_list:[], //过滤后的list
    filter_cate: '全部',
  },
  goodsinfo: {
    goods_id: 0,
    goods: [],
  }
  
}
// getters
const getters = {
  list: state => state.goodslist.list,
  goodslist: state => state.goodslist.filter_list,
  goodscate: state => state.goodslist.cate,
  filter_cate: state => state.goodslist.filter_cate,
  goods_id: state => state.goodsinfo.goods_id,
  goods: state => state.goodsinfo.goods,
}

// actions
const actions = {
  async getGoodslist({ commit, state }) {
    let data = await posts.getGoodslist()
    commit(types.CHANGE_LIST, data) //获取 最新 商品列
    if(!(state.goodslist.filter_list.length > 0)) {
      commit(types.GET_GOODSLIST, data) //把 最新的商品列 同步给 过滤后的list
    }
  },
  async getGoodscate({ commit }) {
    const data = await posts.getGoodscate()
    commit(types.GET_GOODS_CATE, data)
  },
  async getGoods({commit}, paramData) {
    let id = paramData.id
    let $router = paramData.$router
    if(id == null) {
      $router.push({path: 'goods/goodslist'})
    }else {
      const data = await posts.getGoods(id)
      commit(types.CHANGE_GOODS_ID, id)
      commit(types.GET_ONE_GOODS, data)
    }
  }
}

// mutations
const mutations = {
  [types.CHANGE_LIST](state, data) {
    state.goodslist.list = data
  },
  [types.GET_GOODSLIST](state, data) {
    state.goodslist.filter_list = data
  },
  [types.GET_GOODS_CATE](state, data) {
    state.goodslist.cate = data
  },
  [types.CHANGE_FILTER_CATE](state, val) {
    state.goodslist.filter_cate = val
  },
  [types.GET_ONE_GOODS](state, data) {
    state.goodsinfo.goods = data
  },
  [types.CHANGE_GOODS_ID](state, id) {
    state.goodsinfo.goods_id = id
  },
  [types.CHANGE_GOODS_VIEW](state, num) {
    state.goodsinfo.goods.goods_view += num
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
