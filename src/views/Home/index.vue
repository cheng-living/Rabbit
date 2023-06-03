<script setup>

import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'

</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />

  <!-- 非复杂的模板抽象成props，复杂的结构模板抽象为插槽 -->
  <!-- 测试 -->
  <!-- <HomePanel title="新鲜好恶物" subtitle="绝对新鲜">
    <div>我是新鲜</div>
  </HomePanel>
  <HomePanel title="人气爆满" subtitle="非常昊">
    <div>我是人气爆满</div>
  </HomePanel> -->
</template>