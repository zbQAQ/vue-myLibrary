<template>
  <div id="app" @mousemove="changeMouse">

    <div class="navbox" v-if="navShowFlag">

      <div class="navlist">

        <div class="navitem">
          <router-link to="/index">主页</router-link>
        </div>
        <div class="navitem">
          <router-link to="/index">主页</router-link>
        </div>
        <div class="navitem">
          <router-link to="/index">主页</router-link>
        </div>

      </div>

    </div>

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
      mouseY: 0,
      navShowFlag: true
    }
  },
  methods: {
    changeMouse(e) {
      this.mouseY = e.clientY
      if(this.mouseY > 80) {
        this.navShowFlag = false
      }else{
        this.navShowFlag = true
      }
    }
  }
}
</script>

<style scoped>

.navbox {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background: rgba(66,66,66,0.3);
}

.navbox .navlist{
  width: 322px;
  height: 100%;
  margin: 0 auto;
}
.navbox .navlist .navitem{
  float: left;
  text-align: center;
  width: calc(100%/3);
  height: 100%;
  line-height: 75px;
  font-size: 18px;
  font-weight: bold;
}
.navbox .navlist .navitem a{
  color: #fff;
  transition: 0.2s;
}
.navbox .navlist .navitem a:hover{
  color: #cac9c9;
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
}
.footer a{
  color: #ddd;
}
</style>
