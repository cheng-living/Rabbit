// createRouter :创建router实例对象
// createWebHistory:创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue';
import CartList from '@/views/CartList/index.vue';
import Checkout from '@/views/Checkout/index.vue';
import Pay from '@/views/Pay/index.vue';
import PayBack from '@/views/Pay/PayBack.vue';
import Member from '@/views/Member/index.vue';
import UserInfo from '@/views/Member/components/UserInfo.vue';
import UserOrder from '@/views/Member/components/UserOrder.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 1.路由设计依据是 内容切换的方式
  // 2. 默认二级路由如何进行设置 ： path配置项置空
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path: 'paycallback',
          component: PayBack
        },
        {
          path: 'member',
          component: Member,
          children: [
            {
              path: '',
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],
  // 路由滚动行为定制
  // 在不同路由切换的时候，可以自动滚到页面的顶部，而不是停留在原先的位置
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
