<template>
  <div class="main" v-bind:style="bgStyle">

    <!-- btn welcome -->

  </div>
</template>

<script>
export default {
  name: 'welcome',
  data(){
    return {
      data: 'welcome',
      bgStyle:{
        height: document.documentElement.clientHeight + 'px',
        width: document.documentElement.clientWidth + 'px'
      }
    }
  },
  mounted() {
    /**
     * 动态设置背景图的高度为浏览器可视区域高度
     * 首先在Virtual DOM渲染数据时，设置下背景图的高度．
     * 监听window的resize事件．在浏览器窗口变化时再设置下背景图高度． 
    **/
   
    const that = this
    window.onresize = () => {
      return (() => {
        window.bgHeight = document.documentElement.clientHeight
        window.bgWidth = document.documentElement.clientWidth

        that.bgStyle.height = window.bgHeight + 'px'
        that.bgStyle.width = window.bgWidth + 'px'
        // that.bgWidth = window.bgWidth

      })()
    }
  }
}
</script>

<style scoped>

.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../assets/welcome1.jpg');
  background-position: center;
  background-size: cover;
}

</style>
