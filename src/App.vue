<template>
  <div class="app" id="app" @click="changeFuncSel">

    <headnav :funcSelFlag="funcSelFlag"></headnav>

    <router-view></router-view>

    <div class="footer">
      
      <span>CopyRight © 2018. Powered By </span><a href="">zhoubao.</a>

    </div>

  </div>
</template>

<script>
export default {
  name: 'welcome',
  data() {
    return {
      msg: 'welcome',
      funcSelFlag: false,
    }
  },
  methods: {
    changeFuncSel(e) {
      const target = e.target.className
      if(target === 'funcSel') {
        this.funcSelFlag = true
      }else{
        this.funcSelFlag = false
      }
    },
  }
}
</script>

<style scoped>
.app {
  height: 100%;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  line-height:30px;
  background: rgba(66,66,66,0.3);
  text-align: center;
  color: #ddd;
  z-index: 999;
}
.footer a{
  color: #ddd;
}
</style>
