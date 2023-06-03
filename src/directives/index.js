import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app) {
        //定义全局指令

app.directive('img-lazy', {
    mounted(el, binding) {
        // el:指令绑定的那个元素 img
        //binding : binding.value 指令等于号后面的值 图片url
        // console.log(el, binding.value);
        const {stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                // console.log(isIntersecting);
                if (isIntersecting) {
                    el.src = binding.value
                    stop()
                }
            }
        )
    }
})
    }
}