<template>
  <div class="ad-wrapper">
    <a-card class="header">
      <a-row type="flex" justify="end">
        <a-button size="small" type="primary" class="m-r-12">
          导入
        </a-button>
        <a-button size="small" type="primary">
          + 新增员工
        </a-button>
      </a-row>
    </a-card>

    <a-card class="body m-t-10">
      <a-table :data-source="data.rows" row-key="id" bordered>
        <a-table-column title="序号" :width="70">
          <template #default="{index}">
            {{ index + 1 }}
          </template>
        </a-table-column>
        <a-table-column title="姓名" data-index="username" :width="120" />
        <a-table-column title="手机号" data-index="mobile" :width="120" />
        <a-table-column title="工号" data-index="workNumber" :width="80" />
        <a-table-column title="聘用形式" :width="120">
          <template #default="{record: { formOfEmployment }}">
            {{ employmentOptions.filters(formOfEmployment) }}
          </template>
        </a-table-column>
        <a-table-column title="部门" data-index="departmentName" :width="120" />
        <a-table-column title="入职时间" data-index="timeOfEntry" :width="150" />
        <a-table-column title="是否在职" :width="120">
          <template #default="{record: {timeOfEntry, correctionTime}}">
            {{ useCheckTime(correctionTime, timeOfEntry) ? '在职' : '不在职' }}
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="300" align="center" fixed="right">
          <template #default>
            <span class="fs-12 color-primary m-lr-6">查看</span>
            <span class="fs-12 color-primary m-lr-6">转正</span>
            <span class="fs-12 color-primary m-lr-6">调岗</span>
            <span class="fs-12 color-primary m-lr-6">离职</span>
            <span class="fs-12 color-primary m-lr-6">角色</span>
            <span class="fs-12 color-primary m-lr-6">删除</span>
          </template>
        </a-table-column>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { employeesApi } from '../api'
import { employmentOptions, useCheckTime } from '../useStateForm'
import { useLoadingRequest } from '@/composables/useInitRequest.js'

const pageInfo = reactive({
  page: 1,
  size: 10
})

const { data, getData } = useLoadingRequest(() => employeesApi.get(pageInfo))
</script>

<style lang="less" scoped>
.header {
  .ant-btn {
    padding: 0 10px;
  }
}
</style>
