
/**
 * 
 *  all request 
 * 
 */

import axios from 'axios'
const url = 'http://192.168.50.96:3000/'
import { Message } from 'element-ui';
// const url = '/api'
export default class requests {
  static async getFavoriteList() { //获取收藏夹列表
    try {
      const res = await axios.get(url + 'favorites/list')
      console.log('getFavoriteList:', res)
      // debugger
      if(res.status === 200 && res.data.code === 1) {
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
      // debugger
      if(res.status === 200 && res.data.code === 1) {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getFavoriteDetail(id) { //查询某项详情
    try {
      const res = await axios.get('/request_admin/favorites/detail/' + id)
      console.log('getFavoriteDetail:', res)
      // debugger
      if(res.status === 200 && res.data.code === 1) {
        return res.data.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async updateFavoriteOneDetail(id, data) { //修改某项
    try {
      const res = await axios.put('/request_admin/favorites/edit/' + id, data)
      console.log('updateFavoriteOneDetail:', res)
      // debugger
      if(res.status === 200 && res.statusText === 'OK') {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async deleteFavoriteOne(id) { //删除某项
    try {
      const res = await axios.delete('/request_admin/favorites/' + id)
      console.log('deleteFavoriteOne:', res)
      // debugger
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


// //  request 请求异常拦截
// axios.interceptors.request.use(config=> {
//   //==========  所有请求之前都要执行的操作  ==============
//   config.headers.token = storage.get('token') || null
//   // console.log('所有请求之前都要执行的操作config', config)
//   return config;
// }, err=> {
//   //==================  错误处理  ====================
//   console.log('request错误处理err:', err)
//   Notification.error({
//     title: '网络错误',
//     message: '请求超时！请稍后重试',
//     duration: 10000
//   })
//   return Promise.resolve(err);
// })

//  response 响应异常拦截
axios.interceptors.response.use(response => {
  const res = response.data

  if(res.code !== 1) {
    Message.error(res.message);
  }
  
  return response;
}, err => {
  Message.error('服务器错误请联系管理员！！')
  return Promise.reject(err);
})
