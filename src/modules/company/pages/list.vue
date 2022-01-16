<template>
  <a-card>
    <a-table row-key="id" bordered :data-source="companyData" size="middle">
      <a-table-column title="序号" :width="80">
        <template #default="{index}">
          {{ index + 1 }}
        </template>
      </a-table-column>
      <a-table-column title="企业名称" data-index="name" />
      <a-table-column title="版本" data-index="version" />
      <a-table-column title="联系电话" data-index="companyPhone" />
      <a-table-column title="成立时间" data-index="createTime" />
      <a-table-column title="状态" :width="100">
        <template #default="{record}">
          <a-switch v-model:checked="record.modelState" size="small" disabled />
        </template>
      </a-table-column>
      <a-table-column title="操作" :width="100">
        <template #default="{record: { id }}">
          <a-button type="link" @click="goDetail(id)">
            查看
          </a-button>
        </template>
      </a-table-column>
    </a-table>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { companyApi } from '../api'
import { formatDate } from '@/utils/function.js'

const router = useRouter()

const companyData = ref([])

const goDetail = (id) => {
  router.push('/company/detail/' + id)
}

companyApi.get().then(res => {
  res.forEach(item => {
    item.createTime = formatDate(item.createTime)
    item.modelState = !!item.state
  })
  companyData.value = res
})
</script>

<style lang="less" scoped>
.ant-switch-checked {
  background-color: rgb(255, 73, 73);
}
</style>
