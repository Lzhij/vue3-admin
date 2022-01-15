<template>
  <div class="logo">
    <img src="@/assets/common/logo.png" :class="[!collapsed ? '' : 'small']">
  </div>
  <a-menu v-model:selectedKeys="selectedKeys" class="side-menu" theme="dark" mode="inline">
    <a-menu-item v-for="item in routes" :key="item.name" :title="item.meta.title" @click="$router.push({ name: item.name })">
      <AdIcon :name="item.meta.icon" color="#fff" class="side-icon" />
      <span v-show="!collapsed" class="title">{{ item.meta && item.meta.title }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import AdIcon from 'com/ad-icon.vue'
import { defineProps, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  collapsed: Boolean
})
const selectedKeys = ref(['home'])
const router = useRouter()
const routes = computed(() =>  router.getRoutes().filter(item => !item.meta.hidden))
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  justify-content: center;
  height: 55px;
  margin-bottom: 20px;
  align-items: center;

  img {
    display: block;
    width: 140px;

    &.small {
      width: 50px;
    }
  }
}
.side-menu {
  :deep(.ant-menu-item-selected) {
    .side-icon {
      color: #0094ff;
    }
  }
}
.title {
  margin-left: 15px;
}
</style>
