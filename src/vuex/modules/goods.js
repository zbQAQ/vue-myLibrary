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
    goods: [],
    quantity: 1 //当前商品详情的 选择量
  }
  
}
// getters
const getters = {
  list: state => state.goodslist.list,
  goodslist: state => state.goodslist.filter_list,
  goodscate: state => state.goodslist.cate,
  filter_cate: state => state.goodslist.filter_cate,
  goods: state => state.goodsinfo.goods,
  quantity: state => state.goodsinfo.quantity,
}

// actions
const actions = {
  async getGoodslist({ commit, state }) {
    let data = await posts.getGoodslist()
    commit(types.CHANGE_LIST, data) //获取 最新 商品列
    // if(!(state.goodslist.filter_list.length > 0)) {
      commit(types.GET_GOODSLIST, data) //把 最新的商品列 同步给 过滤后的list
    // }
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
      commit(types.GET_ONE_GOODS, data)
    }
  },
  async doPurchase({commit}, paramData) {
    let id = parseInt(paramData.id)
    let num = parseInt(paramData.num)
    const data = await posts.doPurchase(id, num)
    if(data) {alert('购买成功')}
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
  [types.CHANGE_GOODS_VIEW](state, num) {
    state.goodsinfo.goods.goods_view += num
  },
  [types.ADD_QUANTITY](state) {

    if( state.goodsinfo.quantity + 1 <= state.goodsinfo.goods.stock ) {
      state.goodsinfo.quantity++
    }else {
      alert('不能超出库存')
    }
  },
  [types.REDUCE_QUANTITY](state) {
    // state.goodsinfo.quantity--
    if( state.goodsinfo.quantity - 1 > 0 ) {
      state.goodsinfo.quantity--
    }else {
      alert('最少为1哦')
    }
  },
  [types.CHANGE_QUANTITY](state, num) {
    state.goodsinfo.quantity = parseInt(num)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
