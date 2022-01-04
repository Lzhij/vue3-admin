<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
<script>
export default {
  name: 'App'
}
</script>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'

</script>

<style lang="less" scoped></style>
