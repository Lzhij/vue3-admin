<template>
  <div class="ad-wrapper">
    <a-card>
      <a-tabs v-model:activeKey="activeKey" size="small">
        <a-tab-pane key="1" tab="登录账户设置">
          <BaseInfo :id="id" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="个人详情">
          <Person :id="id" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="岗位信息">
          <WorkInfo :id="id" />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseInfo from './components/base.vue'
import Person from './components/person.vue'
import WorkInfo from './components/work-info.vue'

const route = useRoute()

const { id } = route.params

const activeKey = ref('1')

</script>

<style lang="less" scoped>
</style>
