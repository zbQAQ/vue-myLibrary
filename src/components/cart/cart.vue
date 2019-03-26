<template>
  <div class="main">
    
    <div class="headimg">
      <img src="../../../static/img/cartBg.png" alt="">
    </div>
    <div class="shopbox">

      <h1>{{msg}}</h1>

    </div>

  </div>
</template>

<script>
export default {
  name: 'cart',
  data() {
    return {
      msg: 'this is cart'
    }
  },
  methods: {
    
  }
}
</script>

<style>
@import './cart.css';
</style>
