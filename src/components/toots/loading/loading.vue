<template>
  <transition
    name="loading"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOutDown"
  >
    <div class="loading-box">
      
      <div class="mask">

      </div>

    </div>
  </transition>
</template>

<script>
export default {

  props: ['title'],
  data(){
    return {
      msg: 'loading...'
    }
  }

}
</script>

<style>
@import "./loading.css";
</style>
