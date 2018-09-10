import Vue from 'vue'
import Router from 'vue-router'
import AppComponent from '../App'
import WelComponent from '@/components/WelComponent'
import IndexComponent from '@/components/IndexComponent'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      redirect: '/welcome',
      component: AppComponent
    },

    {
      path: '/welcome',
      name: 'welcome',
      component: WelComponent
    },

    {
      path: '/index',
      name: 'index',
      component: IndexComponent
    }

  ]
})
