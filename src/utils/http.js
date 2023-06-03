import axios from 'axios'
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user';
import router from '@/router';
// 创建axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器(可以在接口正式之前对请求参数做一些事情，通常Token数据会被注入到请求的header中，格式按照后端要求的格式进行拼接处理)
http.interceptors.request.use(config => {

  const userStore = useUserStore()
  // 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  // 401 token失效处理

  if (e.response.status === 401) {
    // 1.清楚本地用户数据
    userStore.clearUserInfo()
    // 2.跳转路由
    router.push('/login')
  }
  return Promise.reject(e)
})

export default http