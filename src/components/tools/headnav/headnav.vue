<template>
  <!-- <div class="app" id="app" @click="closeFuncSel"> -->
  <div class="head">
    <div class="navbox" :class="{ onNavShow: navShowFlag }">

      <div class="navlist">

        <div class="navitem">
          <router-link to="/welcome">欢迎</router-link>
        </div>
        <div class="navitem">
          <router-link to="/func">功能列</router-link>
        </div>
        <div class="navitem">
          <router-link to="/login">登录</router-link>
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
