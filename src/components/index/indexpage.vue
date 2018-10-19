<template>
  <div class="main">
    
    <!-- <div class="headbox">
    </div> -->

    <div class="content">
      <h1>input file test</h1>

      <input type="file" name="imgGroup" id="imgGroup" multiple>

    </div> 
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {
      data: 'index',
      view: 'v-a',
      flag: true
    }
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  },
  methods: {
    changeFlag() {
      this.flag = !this.flag
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
  margin: 80px auto;
}
.content .funcItem{
  width: 100%;
  height: 100px;
  background: #666666;
  margin-bottom: 15px;
}

.content .funcItem.Item1{}


.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}


</style>
