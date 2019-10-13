<template>
  <div class="app" id="app">

    <headnav></headnav>

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
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.app {
  /* height: 100%; */
  position: relative;
  min-height: 100%;
  background-color: #f5f5f5;
}
.main {
  position: relative;
}
.footer {
  /* position: fixed; */
  position: absolute;
  /* position: relative; */
  left: 0;
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
