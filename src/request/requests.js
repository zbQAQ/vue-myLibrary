
/**
 * 
 *  all request 
 * 
 */

import axios from 'axios'
// const url = 'api'

export default class requests {
  static async getNewslist() { //获取新闻列表
    try {
      const res = await axios.get('api/getArticle')
      if(res.data.status === 1 && res.data.msg === 'success') {
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
      const res = await axios.get('api/getArt/' + id)
      if(res.data.status === 1 && res.data.msg === 'success') {
        return res.data.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getGoodslist() { //获取商品列表
    try {
      const res = await axios.get('api/getGoodslist')
      if(res.data.status === 1 && res.data.msg === 'success') {
        // console.log(this)
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
      const res = await axios.get('api/getGoodscate')
      if(res.data.status === 1 && res.data.msg === 'success') {
        // console.log(this)
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
  static async getGoods(id) { //获取单个商品
    try {
      const res = await axios.get('api/getGoods/' + id)
      if(res.data.status === 1 && res.data.msg === 'success') {
        // 返回的商品内容需要处理
        res.data.data.goods_content = res.data.data.goods_content.split('|')
        // console.log(res.data.data)
        return res.data.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async login(payload) { //登录 返回登录结果信息
    try {
      const res = await axios.post('api/login', {
        user_name: payload.user_name,
        user_pass: payload.user_pass,
        user_type: payload.user_type,
      })
      if(res.data.status === 1 && res.data.msg === 'success') {
        // 返回的商品内容需要处理
        res.data.data.goods_content = res.data.data.goods_content.split('|')
        // console.log(res.data.data)
        return res.data.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
