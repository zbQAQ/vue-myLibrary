import Vue from 'vue'
import Router from 'vue-router'
import AppComponent from '../App'
import WelCome from '@/components/welcome/welcome'
import IndexPage from '@/components/index/indexpage'
import NewsList from '@/components/news/newslist'
import News from '@/components/news/news'
import GoodsList from '@/components/goods/goodslist'
import GoodsInfo from '@/components/goods/goodsinfo'
import Login from '@/components/login/login'
import Cart from '@/components/cart/cart'

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
      path: '/news/news/:art_id',
      name: 'news',
      component: News
    },
    
    {
      path: '/goods/goodslist',
      name: 'goodslist',
      component: GoodsList
    },
    {
      path: '/goods/goods/:goods_id',
      name: 'goods',
      component: GoodsInfo
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }

  ]
})
