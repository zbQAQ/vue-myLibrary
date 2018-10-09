<template>
  <div class="main">
    
    <!-- <div class="headbox">
    </div> -->

    <div class="content">
      <h1>index vuex test</h1>
      <h2>{{num}}</h2>
      <button @click="addNumber">增加</button>
    </div> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'index',
  data(){
    return {
      data: 'index'
    }
  },
  methods: {
    ...mapActions([
      'changeNumber'
    ]),
    addNumber() {
      this.changeNumber(1)
    }
  },
  computed: {
    ...mapGetters({
      num: 'num'
    })
  }
}
</script>

<style scoped>
.main{
  position: relative;
  width: 100%;
  height: 100%;
}
/* .headbox{
  width: 100%;
  height: 450px;
  background: url('../assets/indexHead.jpg');
  background-position: center;
  background-size: 100% 100%;
  box-shadow: 1px 0px 20px 3px #666;
  z-index: 1;
}
@media (max-width: 997px) {
    .headbox {
      height: 320px;
      background-position: none;
    }
} */

.content{
  width: 80%;
  height: auto;
  margin: 80px auto;
}
.content .funcItem{
  width: 100%;
  height: 100px;
  background: #666666;
  margin-bottom: 15px;
}

.content .funcItem.Item1{}

</style>
