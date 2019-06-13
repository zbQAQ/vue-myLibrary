
/**
 * 
 *  all request 
 * 
 */

import axios from 'axios'
const url = 'https://cmsdev.app-link.org/alucard263096/blog/api/'
          // http://cmsdev.app-link.org/alucard263096/blog/api/

          // goods_thumb --> http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/blog/goods/ ......

export default class requests {
  static async getNewslist() { //获取新闻列表
    try {
      const res = await axios.get(url + 'news/newslist')
      if(res.status === 200 && res.statusText === 'OK') {
        // console.log('getNewslist data:', res.data)
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
      const res = await axios.get(url + 'goods/goodsdetail?id=' + id)
      if(res.status === 200 && res.statusText === 'OK') {
        // 返回的商品内容需要处理
        // console.log('getGoods data:', res)
        res.data.content = this.HtmlDecode(res.data.content)
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async doPurchase(id, num) { //购买商品 id：商品id num：购买个数
    try {
      const res = await axios.get(url + 'goods/goodsbuy?id=' + id + '&num=' + num)
      if(res.status === 200 && res.statusText === 'OK') {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getFuncList() { //获取功能列表
    try {
      const res = await axios.get(url + 'func/funclist')
      // console.log(res, 'getFuncList')
      if(res.status === 200 && res.statusText === 'OK') {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static HtmlDecode(str) { //字符串转义 
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\""); 
  
  
    s = s.replace(new RegExp("</p >", "gm"), "</p ><br />");
    s = s.replace(new RegExp("\"/alucard263096/ariesmall/upload/", "gm"), "\"" + "https://cmsdev.app-link.org/alucard263096/ariesmall/upload/");
  
  
    return s;
  }
  static async getCollectionList() { //获取收藏夹列表
    try {
      const res = await axios.get(url + 'collection/getlist')
      if(res.status === 200 && res.statusText === 'OK') {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async addCollection(name, link, label) { //收藏夹新增 name:名称 link:链接 label:标签
    try {
      const res = await axios.get(url + 'collection/insert?name=' + name + '&link=' + link + '&label=' + label)
      if(res.status === 200 && res.statusText === 'OK') {
        // return res.data
        // 如果新增成功则再请求一次收藏夹列表 并返回
        return this.getCollectionList()
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async delCollection(id) { //收藏夹删除
    try {
      const res = await axios.get(url + 'collection/delete?id=' + id)
      if(res.status === 200 && res.statusText === 'OK') {
        // return res.data
        // 如果删除成功则再请求一次收藏夹列表 并返回
        return this.getCollectionList()
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
