<template>
  <transition
    name="goback"
    mode="out-in"
    enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOutDown"
  >
    <div class="goback-box">

      <div class="goback" @click="goback(path)">
        <a href="javascript:;" alt="返回商品列表">
          <!-- <span>返回商品列表</span> -->
          <i class="fa fa-arrow-left"></i>
        </a>
      </div>

    </div>
  </transition>
</template>

<script>
export default {

  props: ['path'],
  name: 'goback',
  data(){
    return {
      msg: 'goback'
    }
  },
  methods: {
    goback(cpath) {
      if(cpath) {
        this.$router.push({ path: cpath })
      }else{
        this.$router.go(-1)
      }
    }
  },
  created() {
  }
}
</script>

<style>
@import "./goback.css";
</style>
