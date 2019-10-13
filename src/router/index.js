import Vue from 'vue'
import Router from 'vue-router'
import AppComponent from '../App'
import WelCome from '@/components/welcome/welcome'
import funcList from '@/components/func/funcList'
import NewsList from '@/components/news/newslist'
import News from '@/components/news/news'
import GoodsList from '@/components/goods/goodslist'
import GoodsInfo from '@/components/goods/goodsinfo'
import Resume from '@/components/resume/resume'
import Cart from '@/components/cart/cart'
import Collection from '@/components/collection/collection'
import CreateColl from '@/components/collection/createColl'
import MineSweeper from '@/components/mineSweeper/mineSweeper'
import FlyBird from '@/components/flyBird/flyBird'


/** 管理页面 */
import adminLayOut from '@/components/adminPage/adminLayOut'
import adminList from '@/components/adminPage/adminList'
import adminUpdate from '@/components/adminPage/adminUpdate'
import adminCreate from '@/components/adminPage/adminCreate'

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
      path: '/resume',
      name: 'resume',
      component: Resume
    },
    {
      path: '/goods/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection
    },
    {
      path: '/collection/add',
      name: 'createColl',
      component: CreateColl
    },
    {
      path: '/mineSweeper',
      name: 'mineSweeper',
      component: MineSweeper
    },
    {
      path: '/flyBird',
      name: 'flyBird',
      component: FlyBird
    },
    {
      path: '/admin',
      redirect: '/admin/list',
      component: adminLayOut,
      children: [
        {
          path: 'list',
          name: 'list',
          component: adminList
        },
        {
          path: 'update',
          name: 'update',
          component: adminUpdate
        },
        {
          path: 'create',
          name: 'create',
          component: adminCreate
        },
      ]
    },
  ]
})
