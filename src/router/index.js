// createRouter :创建router实例对象
// createWebHistory:创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

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
          component:Home
        },
        {
          path: 'category',
          component: Category
        }
      ]
    }, 
    {
      path: '/login',
      component:Login
    }
  ]
})

export default router
