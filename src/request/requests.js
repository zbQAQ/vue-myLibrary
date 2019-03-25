
/**
 * 
 *  all request 
 * 
 */

import axios from 'axios'
const url = 'http://cmsdev.app-link.org/alucard263096/blog/api/'
          // http://cmsdev.app-link.org/alucard263096/blog/api/

          // goods_thumb --> http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/blog/goods/ ......

export default class requests {
  static async getNewslist() { //获取新闻列表
    try {
      const res = await axios.get(url + 'news/newslist')
      if(res.status === 200 && res.statusText === 'OK') {
        console.log('getNewslist data:', res.data)
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getNews(id) { //获取单个新闻
    try {
      const res = await axios.get(url + 'news/newsdetail?id=' + id)
      if(res.status === 200 && res.statusText === 'OK') {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getGoodslist() { //获取商品列表
    try {
      const res = await axios.get(url + 'goods/goodslist')
      if(res.status === 200 && res.statusText === 'OK') {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getGoodscate() { //获取商品所有分类
    try {
      const res = await axios.get(url + 'category/catelist')
      // console.log('getGoodscate data:', res)
      if(res.status === 200 && res.statusText === 'OK') {
        let data = res.data
        let filter = ['全部']
        for(let v of data) {//默认第一个是全部
          filter.push(v.name)
        }
        // console.log('filter:', filter)
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
        console.log('getGoods data:', res)
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
