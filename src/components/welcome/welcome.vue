<template>
  <div class="main" >
    <!-- btn welcome -->
    <h1>{{msg}}</h1>

    <!-- <div style="margin: 18px;">
      <p>arr</p>
      <ul><li v-for="(item, index) of arr" :key="index">{{item}}</li></ul><br><br><br>
      <p>obj</p>
      <ul><li v-for="(item, index) of obj" :key="index">{{item}}</li></ul>
    </div>
    <button @click="test">click me</button> -->

  </div>
</template>

<script>
export default {
  name: 'welcome',
  data(){
    return {
      msg: 'welcome to myLibrary',
      arr: [1,2,3,4,5,6],
      obj: {
        1: 1,
        2: '222',
        3: {
          name: '3geName',
          num: '3'
        }
      }
    }
  },
  methods: {
    test() {
      alert(`1`)
    }
  }
}
</script>

<style scoped>
.main {
  position: fixed;
  color: #fff;
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
