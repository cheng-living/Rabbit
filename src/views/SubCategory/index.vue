<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import GoodsItem from '../Home/components/GoodsItem.vue';
const route = useRoute()
const CategoryData = ref({})

const getCategoryData = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    console.log("@@@", route);
    CategoryData.value = res.result

}

//获取基础列表数据
const goodsList = ref([])
const reqDate = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortFieId: 'publishTime'
})
const getGoodsList = async () => {
    const res = await getSubCategoryAPI(reqDate.value)
    // console.log(res.result);
    goodsList.value = res.result.items
    // console.log(goodsList.value);
}
//切换分类
function tabChange() {
    // console.log(reqDate.sortFieId);
    reqDate.value.page = 1
    getGoodsList()
}

//停止加载
const disabled = ref(false)
//加载更多load
const load = async () => {
    // console.log('加载更多资源');
    //获取下一页
    reqDate.value.page++;
    const res = await getSubCategoryAPI(reqDate.value)

    //拼接新老数据(先展开旧数据然后接新数据)
    goodsList.value = [...goodsList.value, ...res.result.items]
    // console.log(...goodsList.value);

    //加载完毕停止监听
    if (res.result.items.length === 0) {
        disabled.value = true
    }
}

onMounted(() => [getCategoryData(), getGoodsList()])
// 以下都可以
// onMounted(() => {
//     getCategoryData(), getGoodsList()
// })
// onMounted(() => getCategoryData())
// onMounted(() => getGoodsList())
</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${CategoryData.parentId}` }">{{ CategoryData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ CategoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="reqDate.sortFieId" @tab-click="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-->
                <GoodsItem v-for="goods in goodsList" :goods="goods" :key="goods.id" />
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>