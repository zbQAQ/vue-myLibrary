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
    </div>
    <goback path="/collection">返回收藏夹</goback>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'createColl',
  data(){
    return {
      msg: 'this is createColl',
      nameInput: '',
      linkInput: '',
      labelInput: '',
    }
  },
  created() {
  },
  methods: {
    ...mapActions([
      'addCollList',
    ]),
    async addCollection() {
      let name = this.nameInput
      let link = this.linkInput
      let label = this.labelInput
      if(name != "" && link != "" && label != "") {
        await this.addCollList({name: name, link: link, label: label})
        this.nameInput = this.linkInput = this.labelInput = ""
        alert('新增成功')
        this.$router.push({path: '/collection'})
      }else {
        alert('输入值不能为空!')
      }
    },
  },
  computed: {
  }
}
</script>

<style scoped>
@import './collection.css';
</style>
