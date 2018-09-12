<template>
  <div class="app" id="app" @mousemove="changeMouse" @click="closeFuncSel">

    <div class="navbox" :class="{ onNavShow: navShowFlag }">

      <div class="navlist">

        <div class="navitem">
          <router-link to="/welcome">欢迎</router-link>
        </div>
        <div class="navitem">
          <a class="funcSel" src="javascript:;">功能</a>
          <transition
            name="selecttran"
            enter-active-class="animated fadeIn "
            leave-active-class="animated fadeOut "
          >
            <div class="select" v-if="funcSelFlag">
              <ul class="selul">
                <router-link to="/news/newslist"><li class="selitem">新闻列</li></router-link>
                <router-link to="/todo/todolist"><li class="selitem">记事本</li></router-link>
                <router-link to="/goods/goodslist"><li class="selitem">商品列</li></router-link>
                <router-link to="/cart"><li class="selitem">购物车</li></router-link>

              </ul>
            </div>
          </transition>
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
      navShowFlag: false,
      funcSelFlag: false
    }
  },
  methods: {

    changeMouse(e) {
      this.mouseY = e.clientY
    },

    closeFuncSel(e) {
      const target = e.target.className
      if(target === 'funcSel') {
        this.funcSelFlag = true
      }else{
        this.funcSelFlag = false
      }
    }

  },
  watch: {
    mouseY(val) {
      const winHeight = document.documentElement.clientHeight
      if(val > winHeight/3) {
        this.navShowFlag = false
        this.funcSelFlag = false
      }else{
        this.navShowFlag = true
      }

    }
  }
}
</script>

<style scoped>
.app {
  height: 100%;
}
.navbox {
  position: fixed;
  top: -80px;
  width: 100%;
  height: 80px;
  transition: 0.3s;
  background: rgba(66,66,66,0.5);
  z-index: 99;
}
.navbox.onNavShow{
  top:0
}
.navbox .navlist{
  width: 322px;
  height: 100%;
  margin: 0 auto;
}
.navbox .navlist .navitem{
  position: relative;
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
  cursor: pointer;
}
.navbox .navlist .navitem a:hover{
  color: #cac9c9;
}

.navbox .navlist .navitem .select{
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: auto;
  background: rgba(66,66,66,0.5);
  transition: 0.5s ease;
}
.navbox .navlist .navitem .select .selul{
  width: 100%;
}

.navbox .navlist .navitem .select .selul .selitem{
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #999;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s;
}
.navbox .navlist .navitem .select .selul .selitem:hover{
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
  z-index: 999;
}
.footer a{
  color: #ddd;
}
</style>
