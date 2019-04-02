<template>
  <div class="main">
    
    <div class="headimg">
      <img src="static/img/banner1.jpg" alt="">
    </div>
    <div class="content">
      <div class="searchbox">
        <div class="search">
          <input type="text" class="searchInput" v-model="filterInput" placeholder="输入你要查找的关键字">
          <a href="javascript:;" class="searchBtn" @click="doSearch"><i class="fa fa-search"></i>搜索</a>
          <router-link to="/collection/add" class="createBtn"><i class="fa fa-pencil"></i>新增</router-link>
        </div>
      </div>
      
      <div class="list">
        <div class="collItem" v-for="(item, index) of collectionList" :key="index">
          <div class="collection">
            <span class="time">{{item.created_date | datefmt('yyyy-MM-dd')}}</span>
            <a :href="item.link" class="collName">{{item.name}}</a>
            <div class="iconLabel">
              <img src="static/img/label.png" alt="">
              <span>{{item.label}}</span>
            </div>
          </div>
          <div class="delete" @click="delCollection(item.id)">
            <img src="static/img/delete.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'collection',
  data(){
    return {
      msg: 'this is collection',
      filterInput: '',
    }
  },
  async created() {
    await this.getCollList()
  },
  methods: {
    ...mapActions([
      'getCollList',
      'addCollList',
      'delCollList',
    ]),
    doSearch() {
      let input = this.filterInput
      if(input != "") {
        // !!!!!!!!!!!!!
      }else {
        alert('输入值不能为空!')
      }

    },
    async delCollection(id) {
      let r = confirm('你确定要删除这一项吗？')
      if(r == true) {
        await this.delCollList(id)
      }
    },
  },
  computed: {
    ...mapGetters([
      'collectionList'
    ])
  }
}
</script>

<style scoped>
@import './collection.css';
</style>
