<template>
  <div class="main">
    
    <div class="headimg">
      <img src="static/img/banner1.jpg" alt="">
    </div>
    <div class="content">
      <div class="createForm">
        <p class="title">新增你的收藏</p>
        <div class="createBox">
          <div class="formLabel">
            名称：<input type="text" v-model="nameInput" placeholder="名称">
          </div>
          <div class="formLabel">
            链接：<input type="text" v-model="linkInput" placeholder="链接">
          </div>
          <div class="formLabel">
            标签：<input type="text" v-model="labelInput" placeholder="标签">
          </div>
        </div>
        <div class="formBtn" @click="addCollection">新增一项</div>
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
      nameInput: '',
      linkInput: '',
      labelInput: '',
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
    async addCollection() {
      let name = this.nameInput
      let link = this.linkInput
      let label = this.labelInput
      if(name != "" && link != "" && label != "") {
        await this.addCollList({name: name, link: link, label: label})
        this.nameInput = this.linkInput = this.labelInput = ""
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
