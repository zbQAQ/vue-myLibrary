
/**
 * 
 *  all request 
 * 
 */

import axios from 'axios'
const url = 'http://192.168.50.96:3000/'
// const url = '/api'
export default class requests {
  static async getFavoriteList() { //获取收藏夹列表
    try {
      const res = await axios.get(url + 'favorites/list')
      console.log('getFavoriteList:', res)
      debugger
      if(res.status === 200 && res.statusText === 'OK') {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async createOneFavorite(data) { //新增一个收藏项
    try {
      const res = await axios.post('/request_admin/favorites/create', data)
      console.log('createOneFavorite:', res)
      debugger
      if(res.status === 200 && res.statusText === 'OK') {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
