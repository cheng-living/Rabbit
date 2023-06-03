// 获取订单
import http from '@/utils/http'
export const getCheckInfoAPI = () => {
    return http({
        url: '/member/order/pre'
    })
}

// 创建订单
export const createOrderAPI = (data) => {
    return http({
        url: '/member/order',
        method: 'POST',
        data
    })
}