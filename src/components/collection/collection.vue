<template>
  <div class="main">
    
    <div class="headimg">
      <img src="static/img/banner1.jpg" alt="">
    </div>
    <div class="content">
      <div class="searchbox">
        <div class="search">
          <input type="text" class="searchInput" v-model="filterInput" placeholder="输入你要查找的关键字 ( 区分大小写 )" @keyup.enter="doSearch">
          <a href="javascript:;" class="searchBtn" @click="doSearch"><i class="fa fa-search"></i>搜索</a>
          <router-link to="/collection/add" class="createBtn"><i class="fa fa-pencil"></i>新增</router-link>
          <a href="javascript:;" class="resetBtn" v-show="searchFlag" @click="reset"><i class="fa fa-refresh"></i>重置</a>
        </div>
      </div>
      <div class="list" v-show="isLoading">
        <loading></loading>
      </div>
      <div class="list" v-show="!isLoading && !searchFlag">
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
      <div class="list filter" v-show="!isLoading && searchFlag && filterList.length > 0">
        <div class="collItem" v-for="(item, index) of filterList" :key="index">
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
      <div class="list" v-show="filterList.length <= 0">
        <div class="noneFilter">
          <p class="">没有你搜索的内容</p>
          <a href="javascript:;" @click="reset">点击重置</a>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'collection',
  data(){
    return {
      msg: 'this is collection',
      filterInput: '',
      searchFlag: false,
      isLoading: true
    }
  },
  async created() {
    await this.getCollList()
    this.isLoading = false
  },
  methods: {
    ...mapActions([
      'getCollList',
      'addCollList',
      'delCollList',
    ]),
    ...mapMutations({
      changeCollection: 'CHANGE_COLLECTION',
      changeFilterColl: 'CHANGE_FILTER_COLLECTION',
    }),
    doSearch() {
      let keyWord = this.filterInput
      let list = this.collectionList
      if(keyWord != "") {      
        var reg =  new RegExp(keyWord);
        var arr = [];
        for (var i = 0; i < list.length; i++) {
          if (reg.test(list[i].label) || reg.test(list[i].name)) {
            arr.push(list[i]);
          }
        }
        this.changeFilterColl(arr)
        this.searchFlag = true
      }else {
        this.searchFlag = false
        // alert('输入值不能为空!')
        this.$toast({msg: '输入值不能为空', type: 'warn', duration: 2000, position: 'top'})
      }
    },
    async delCollection(id) {
      let r = confirm('你确定要删除这一项吗？')
      if(r == true) {
        await this.delCollList(id)
        this.$toast({msg: '删除成功', type: 'success', duration: 2000, position: 'top'})
      }
    },
    async reset() {
      this.isLoading = true
      await this.getCollList()
      this.filterInput = ''
      this.searchFlag = false
      this.isLoading = false
    }
  },
  computed: {
    ...mapGetters([
      'collectionList',
      'filterList',
    ])
  }
}
</script>

<style scoped>
@import './collection.css';
.absolute {
  position: absolute;
}
</style>
