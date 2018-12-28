
/**
 * 
 *  all request_mock
 * 
 */

import axios from 'axios'
// const url = 'api'

export default class requests {
  static async getNewslist() { //获取新闻列表
    try {
      const res = await axios.get('/mock/newslist')
      if(res.data.status === 1 && res.data.msg === 'success') {
        console.log('getNewslist mockdata:', res)
        return res.data.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getNews(id) { //获取单个新闻
    try {
      const res = await axios.get('/mock/newslist')
      if(res.data.status === 1 && res.data.msg === 'success') {
        console.log('getNews mockdata:', res.data.data[id-1])
        return res.data.data[id-1]
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getGoodslist() { //获取商品列表
    try {
      const res = await axios.get('/mock/goodslist')
      if(res.data.status === 1 && res.data.msg === 'success') {
        console.log('getGoodslist mockdata:', res)
        return res.data.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getGoodscate() { //获取商品所有分类
    try {
      const res = await axios.get('/mock/goodscate')
      if(res.data.status === 1 && res.data.msg === 'success') {
        console.log('getGoodscate mockdata:', res)
        let data = res.data.data
        let filter = ['全部'] //默认第一个是全部
        for(let v of data) {  //将获取到的商品分类处理 只需要分类名称
          filter.push(v.gcate_name)
        }
        return filter
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  //mock数据 获取单个商品时是从已请求的list里面根据id查找 所以不需要重新请求单个商品
  // static async getGoods(id) { //获取单个商品
  //   try {
  //     const res = await axios.get('api/getGoods/' + id)
  //     if(res.data.status === 1 && res.data.msg === 'success') {
  //       // 返回的商品内容需要处理
  //       console.log('getGoods mockdata:', res)
  //       res.data.data.goods_content = res.data.data.goods_content.split('|')
  //       // console.log(res.data.data)
  //       return res.data.data
  //     }
  //     return null
  //   } catch (e) {
  //     console.log(e)
  //     return null
  //   }
  // }
  static async testMock() { //测试mock
    try {
      const res = await axios.get('/test/apiData')
      console.log('testMock -> res : ', res)
      if(res.data.status === 1 && res.data.msg === 'success') {
        return res.data.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
