// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './components/global.css' //全局样式
import '../node_modules/animate.css/animate.min.css' //animate动画样式
import '../node_modules/font-awesome/css/font-awesome.min.css' //font-awesome导入图标库

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

