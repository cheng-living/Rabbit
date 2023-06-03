// 封装购物车模块
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './user.js';
import { insertCartAPI, findNewCartListAPI, delCartAPI, mergeCartAPI } from '@/apis/cart.js';
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 定义state -cartList
    const cartList = ref([])

    // 登录合并本地购物车
    const mergeCart = async () => {
        await mergeCartAPI(cartList.value.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
    }

    // 更新购物车
    const updataNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    // 定义action -addCart
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            // 登录之后的加入购物车逻辑
            await insertCartAPI({ skuId, count })
            updataNewList()
        } else {
            // 非登录时操作本地
            //添加购物车操作
            // console.log('添加', goods);
            // 已添加过 = count += 
            // 没有添加过 - 直接push
            // 思路：匹配传递过来的商品对象中的skuId能不能在cartList中找到
            const item = cartList.value.find((data) => goods.skuId === data.skuId)
            // console.log(cartList.count);
            if (item) {
                // 找到了
                item.count += goods.count
            } else {
                cartList.value.push(goods)
            }
        }

    }

    // 退出删除购物车数据
    const clearCart = () => {
        cartList.value = []
    }

    // 删除购物车商品
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updataNewList()
        } else {
            // 1.找到删除项的下标值 ---splice
            // 2. 使用数组的过滤方法----filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
        // 通过shkId找到要修改的那一页，然后把他的selected修改为传过来的selected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
        // 把cartList中的每一项的selected都设置为当前的全选状态
        cartList.value.forEach(item => item.selected = selected)
    }

    // 计算属性

    // // 总的数量 所有项的count之和
    const allCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0))

    // // 总价 所有项的count*price之和
    const allPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.count * item.price, 0))

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    // 已选择的数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((sum, item) => sum + item.count, 0))
    // 已选择的商品总价格
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((sum, item) => sum + item.count * item.price, 0))
    return {
        cartList, isAll, allCount, allPrice, selectedCount, selectedPrice, addCart, mergeCart, delCart, singleCheck, allCheck, clearCart, updataNewList
    }
}, { persist: true, })