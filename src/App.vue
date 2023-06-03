<script setup>

</script>

<template>
  <!-- 一级路由出口 -->
  <router-view></router-view>

  <div class="test">scss test</div>
</template>

<style scoped lang="scss">
.test {
  color: $priceColor;
}
</style>