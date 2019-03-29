import Vue from 'vue'
import Router from 'vue-router'
import AppComponent from '../App'
import WelCome from '@/components/welcome/welcome'
import funcList from '@/components/func/funcList'
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
      path: '/func',
      name: 'func',
      component: funcList
    },

    {
      path: '/news/newslist',
      name: 'newslist',
      component: NewsList
    },
    {
      path: '/news/newsDetail',
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
      path: '/goods/cart',
      name: 'cart',
      component: Cart
    }

  ]
})
