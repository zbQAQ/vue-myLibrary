
/**
 * 
 *  all request 
 * 
 */

import axios from 'axios'
// const url = 'api'

export default class requests {
  static async getNewslist() {
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
  static async getNews(id) {
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
}
