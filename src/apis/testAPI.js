import http from '@/utils/http'

export function getCategory() {
    return http({
        url: 'home/category/head'
      })
}