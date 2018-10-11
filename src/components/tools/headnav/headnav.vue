<template>
  <!-- <div class="app" id="app" @click="closeFuncSel"> -->
  <div class="head">
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

    <div class="navshowbtn" v-show="toggleFlag" @click="navShow"> <!--导航按钮-->
      <i class="fa fa-bars"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: 'welcome',
  props: ['funcSelFlag'],
  data() {
    return {
      navShowFlag: false,
      toggleFlag: true,
    }
  },
  mounted() {
    this.routeNav()
  },
  methods: {

    navShow() {
      this.navShowFlag = !this.navShowFlag
    },
    
    routeNav() {
      let route = this.$route
      if(route.path === '/welcome') {
          this.toggleFlag = true
        }else{
          this.navShowFlag = true
          this.toggleFlag = false
      }
    }

  },
  watch: {
    '$route': 'routeNav',
    testnum(val, old) {
      console.log(val, old)
    }
  }
}
</script>

<style scoped>
@import './headnav.css';
</style>
