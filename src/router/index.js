import Vue from 'vue'
import Router from 'vue-router'
import AppComponent from '../App'
import WelCome from '@/components/welcome/welcome'
import IndexPage from '@/components/index/indexpage'
import NewsList from '@/components/news/newslist'
import News from '@/components/news/news'

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
      component: WelCome
    },

    {
      path: '/index',
      name: 'index',
      component: IndexPage
    },

    {
      path: '/news/newslist',
      name: 'newslist',
      component: NewsList
    },

    {
      path: '/news/new/:art_id',
      name: 'news',
      component: News
    }

  ]
})
