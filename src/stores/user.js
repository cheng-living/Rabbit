// 如何使用Pinia管理数据
// 遵循理念：和数据相关的所有操作（state+actio）都放到Pinia中，组件只负责触发action函数

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginAPI } from '@/apis/user';
import { useCartStore } from '@/stores/carStore';



// 管理用户相关数据

export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    // 1.定义管理用户数据的state
    const userInfo = ref({})
    // 2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result

        // 合并购物车
        await cartStore.mergeCart()

        // 更新购物车
        await cartStore.updataNewList()
    }
    // 退出时清除用户信息
    const clearUserInfo = () => {

        userInfo.value = {}
        cartStore.clearCart()
    }
    // console.log('@@@@@@@', userInfo);
    return { userInfo, getUserInfo, clearUserInfo }
}, { persist: true, })