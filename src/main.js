// 引入初始化样式
import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// 引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives'
// 引入全局组件插件
import { componentPlugin } from './components/index';
//测试接口函数
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res=>{console.log(res);})
const app = createApp(App)
const pinia = createPinia()
// 注册持久化插件(运行机制：在设置state的时候会自动把数据同步给localstorage，在获取state数据的时候会优先从localstorage中取)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.use(componentPlugin)
app.use(lazyPlugin)
app.mount('#app')

