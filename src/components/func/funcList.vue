<template>
  <div class="main">
    
    <div class="headimg">
      <img src="static/img/banner1.jpg" alt="">
    </div>
    <div class="content">
      <div class="funcItem ripple" v-for="(item, index) of funcList" :key="index" :style="{backgroundColor: item.bgcolor, color: item.color}">
        <div class="func">
          <div class="leftIcon">
            <img :src="'http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/blog/func/' + item.iconpath" alt="">
          </div>
          <div class="rightCnt">
            <p @click="toFuncDetail(item.path)">{{item.name}}</p>
            <router-link :to="item.path" class="inBtn">
              <img src="../../../static/img/right.png" alt="">
            </router-link>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'func',
  data(){
    return {
      // msg: 'this is funclist'
    }
  },
  async created() {
    this.getFuncList()
  },
  methods: {
    ...mapActions([
      'getFuncList'
    ]),
    toFuncDetail(path) {
      this.$router.push({path: path})
    },
  },
  computed: {
    ...mapGetters([
      'funcList'
    ])
  }
}
</script>

<style scoped>
@import './funcList.css';
.ripple {
    position: relative;
    overflow: hidden;
}
.ripple:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
}
.ripple:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
}
</style>
