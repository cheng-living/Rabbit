// 封装分类列表轮播图相关业务代码
import { ref, onMounted } from 'vue';
import { getTopCategoryAPI } from '@/apis/category'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
export function useCategory() {
    // 分类列表
    const categoryData = ref({})
    const route = useRoute()
    //一开始加载路由 使用默认路由id ，后面切换路由就使用传过来的id
    const getCategory = async (id = route.params.id) => {
        const res = await getTopCategoryAPI(id)
        categoryData.value = res.result
        // console.log(categoryData);
    }
    onMounted(() => getCategory())

    onBeforeRouteUpdate((to) => {
        // console.log('路由变化了', to);
        //存在问题：使用最新的路由参数请求最新的分类数据
        getCategory(to.params.id);
    })
    return {
        categoryData
    }
}