<template>
  <div class="main" >
    
    <!-- btn welcome -->
    <h1>{{msg}}</h1>

  </div>
</template>

<script>
export default {
  name: 'welcome',
  data(){
    return {
      msg: 'welcome to myLibrary'
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;

  background: url('../../../static/img/welcome1.jpg');
  background-position: center;
  background-size: cover;
}

.main h1{
  position: relative;
  top: 25%;
  width: 100%;
  color: aliceblue;
  text-align: center;
  font-weight: 500;
}

</style>
