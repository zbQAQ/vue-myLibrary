import * as types from '../mutation-types'
import posts from '@/request/requests'
// initial state
const state = {
  cartList: [
    // {
    //   id: 1,
    //   name: '安踏篮球鞋男汤普森KT4战靴高帮2019新款官网全明星运动鞋青花瓷',
    //   thumb: 'static/img/thumb430x.jpg',
    //   stock: 999,
    //   price: 10.00,
    //   quantity: 1,
    //   isChecked: false,
    // },
    // {
    //   id: 2,
    //   name: '安踏篮球鞋男汤普森KT4战靴高帮2019新款官网全明星运动鞋青花瓷',
    //   thumb: 'static/img/thumb430x.jpg',
    //   stock: 999,
    //   price: 20.00,
    //   quantity: 1,
    //   isChecked: false,
    // },
    // {
    //   id: 3,
    //   name: '安踏篮球鞋男汤普森KT4战靴高帮2019新款官网全明星运动鞋青花瓷',
    //   thumb: 'static/img/thumb430x.jpg',
    //   stock: 5,
    //   price: 30.00,
    //   quantity: 1,
    //   isChecked: false,
    // }
  ],
  total: 0,
  allChecked: false,
  selected: 0
}
// getters
const getters = {
  cartList: state => state.cartList,
  total: state => state.total,
  allChecked: state => state.allChecked,
  selected: state => state.selected,
}

// actions
const actions = {
  async buyShopCart ({commit}, shopArr) {
    let shopLen = shopArr.length
    let delArr = []
    let data = {}
    for(let i = 0; i < shopLen; i++) {
      data = await posts.doPurchase(shopArr[i].id, shopArr[i].quantity)
      if(data.status == 0 && data.statusText == "OK") {
        delArr.push(shopArr[i].id)
        commit(types.DELETE_CART_LIST, delArr)
      }
    }
    setTimeout(_ => {if(data){alert('购买成功')}},0)
  }
}

// mutations
const mutations = {
  [types.CHANGE_CART_LIST](state, list) {
    state.cartList = list
  },
  [types.DELETE_CART_LIST](state, delArr) {
    let delLen = delArr.length
    let cartList = state.cartList
    for(let i = 0; i < delLen; i++) {
      let index = cartList.indexOf(cartList.find(v => v.id == delArr[i]))
      cartList.splice(index, 1)
    }
    
  },
  [types.CART_ADD_QUANTITY](state, id) {
    let list = state.cartList
    for(let i = 0; i < list.length; i++) {
      if(list[i].id == id) {
        state.cartList[i].quantity++
      }
    } 
  },
  [types.CART_REDUCE_QUANTITY](state, id) {
    let list = state.cartList
    for(let i = 0; i < list.length; i++) {
      if(list[i].id == id) {
        state.cartList[i].quantity--
      }
    } 
  },
  [types.CART_INPUT_QUANTITY](state, paramData) {
    let id = paramData.id
    let num = paramData.num
    let list = state.cartList
    for(let i = 0; i < list.length; i++) {
      if(list[i].id == id) {
        state.cartList[i].quantity = num
      }
    }
  },
  [types.CHANGE_ONCE_CHECKED](state, paramData) {
    let id = paramData.id
    let goods = state.cartList.find(v => v.id === id)
    // debugger
    let flag = paramData.flag !== undefined ? paramData.flag : !goods.isChecked
    goods.isChecked = flag
  },
  [types.CHANGE_ALLCHECKED](state, flag) {
    state.allChecked = flag
  },
  [types.CHANGE_TOTAL](state, total) {
    state.total = total
  },
  [types.CHANGE_SELECTED](state, num) {
    state.selected = num
  },
}
export default {
  state,
  getters,
  actions,
  mutations
}
