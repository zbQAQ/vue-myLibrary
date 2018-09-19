<template>
  <div class="main">
    <div class="headimg">
      <img src="../../assets/banner1.jpg" alt="">
    </div>

    <div class="content">
      <div class="newview">
        <div class="title">{{art.art_title}}</div>
        <div class="info">
          <ul>
            <li><i class="fa fa-pencil"></i>作者：<span>{{art.art_editor}}</span></li>
            <li><i class="fa fa-eye"></i>时间: <span>{{art.art_time}}</span></li>
            <li><i class="fa fa-clock-o"></i>阅读数: <span>{{art.art_view}}</span></li>
          </ul> 
        </div>
        <div class="thumb">
          <img alt="" :src="'/laravel-blog.com/' + art.art_thumb">
        </div>
        <div class="newcon" v-html="art.art_content">
          <!-- more text -->
          
        </div>

      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  name: 'new',
  data(){
    return {
      art_id: 0,
      art: {},
      msg: 'new'
    }
  },
  async created() {
    this.art_id = this.$route.params.art_id
    this.art = await this.getNew()
  },
  methods: {
    async getNew() {
      try {
        const res = await this.$axios.get('api/getArt/' + this.art_id)
        if(res.data.status === 1 && res.data.msg === 'success') {
          // console.log(res)
          return res.data.data
        }
        return null
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }
}
</script>

<style scoped>
  @import "new";
</style>
