// 封装倒计时逻辑函数

// 格式化工具
import dayjs from 'dayjs';
import { computed, onUnmounted, ref } from 'vue';
export const useCountDown = () => {
    let timer = null

    // 1.响应式数据
    const time = ref(0)
    // 格式化时间
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    const start = (currentTime) => {
        // 开始倒计时的逻辑
        // 核心逻辑的编写：每隔1s就减一
        time.value = currentTime
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    onUnmounted(() => {
        // 如果定时器存在那就清除
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}