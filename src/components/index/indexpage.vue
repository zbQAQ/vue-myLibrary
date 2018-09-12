<template>
  <div class="main">
    
    <!-- <div class="headbox">
    </div> -->

    <div class="content">
      
      <div class="funcItem Item1">
        <div class="info">功能一</div>
      </div>
      <div class="funcItem Item2">
        <div class="info">功能二</div>
      </div>
      <div class="funcItem Item3">
        <div class="info">功能三</div>
      </div>
      <div class="funcItem Item4">
        <div class="info">功能四</div>
      </div>
      <div class="funcItem Item5">
        <div class="info">功能五</div>
      </div>
      <div class="funcItem Item6">
        <div class="info">功能六</div>
      </div>

    </div>
    
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {
      data: 'index'
    }
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
  margin: 0 auto;
}
.content .funcItem{
  width: 100%;
  height: 100px;
  background: #666666;
  margin-bottom: 15px;
}

.content .funcItem.Item1{}

</style>
