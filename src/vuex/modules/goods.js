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
    filter_name: '',
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
  filter_name: state => state.goodslist.filter_name,
  goods_id: state => state.goodsinfo.goods_id,
  goods: state => state.goodsinfo.goods,
}

// actions
const actions = {
  async getGoodslist({ commit, state }) {
    let data
    if(state.goodslist.list.length > 0){
      //判断 商品列是否有值 有就返回没有就请求数据
      data = state.goodslist.list
    }else{
      data = await mock.getGoodslist()
      commit(types.CHANGE_LIST, data)
    }
    commit(types.GET_GOODSLIST, data)
  },
  async getGoodscate({ commit }) {
    const data = await mock.getGoodscate()
    commit(types.GET_GOODS_CATE, data)
  },
  async getGoods({commit}, paramData) {

    let id = paramData.id
    let $router = paramData.$router
    let list = state.goodslist.list
    if(list !== null && list.length > 0) {

      const data = list.filter(v => v.goods_id == id)[0]
      console.log('getGoods mockdata:', data)
      commit(types.GET_ONE_GOODS, data)
      commit(types.CHANGE_GOODS_VIEW, 1) //触发修改阅读数事件
    }else{
      $router.push('/goods/goodslist')
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
  [types.CHANGE_FILTER_NAME](state, val) {
    state.goodslist.filter_name = val
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
