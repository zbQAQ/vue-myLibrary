// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './components/global.css' //全局样式
import '../node_modules/animate.css/animate.min.css' //animate动画样式
import '../node_modules/font-awesome/css/font-awesome.min.css' //font-awesome导入图标库
import axios from 'axios' //axios
import { formatDate } from './components/tools/formatDate/formatDate.js' //时间格式化工具

import loading from './components/tools/loading/loading.vue' //loading 组件
import headnav from './components/tools/headnav/headnav.vue' //header 组件

import store from './vuex/index' //引入vuex

Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.prototype.$axios = axios

Vue.filter('datefmt', (input, fmt = 'yyyy-MM-dd') => {
  // console.log(input, fmt)
	var date = new Date(input);
  return formatDate(date, fmt);
  
});

Vue.component('loading', loading)
Vue.component('headnav', headnav)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

