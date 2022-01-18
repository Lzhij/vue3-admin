<template>
  <div class="ad-wrapper">
    <a-card class="header">
      <a-row type="flex" justify="end">
        <a-button size="small" type="primary" class="m-r-12">
          导入
        </a-button>
        <a-button size="small" type="primary" @click="onShowModal">
          + 新增员工
        </a-button>
      </a-row>
    </a-card>

    <a-card class="body m-t-10">
      <a-table :data-source="data.rows" row-key="id" bordered :pagination="false">
        <a-table-column title="序号" :width="70">
          <template #default="{ index }">
            {{ index + 1 }}
          </template>
        </a-table-column>
        <a-table-column title="姓名" data-index="username" :width="120" />
        <a-table-column title="手机号" data-index="mobile" :width="120" />
        <a-table-column title="工号" data-index="workNumber" :width="80" />
        <a-table-column title="聘用形式" :width="120">
          <template #default="{ record: { formOfEmployment } }">
            {{ employmentOptions.filters(formOfEmployment) }}
          </template>
        </a-table-column>
        <a-table-column title="部门" data-index="departmentName" :width="120" />
        <a-table-column title="入职时间" data-index="timeOfEntry" :width="150" />
        <a-table-column title="是否在职" :width="120">
          <template #default="{ record: { timeOfEntry, correctionTime } }">
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

  <a-modal v-model:visible="modalVisible" :title="modalTitle" width="40%" @cancel="resetFields" @ok="onSubmit">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="姓名" v-bind="validateInfos.username" label-align="left">
        <a-input v-model:value.trim="formState.username" placeholder="请输入员工姓名" />
      </a-form-item>
      <a-form-item label="手机" v-bind="validateInfos.mobile" label-align="left">
        <a-input v-model:value.trim="formState.mobile" placeholder="请输入员工手机号" />
      </a-form-item>
      <a-form-item label="入职时间" v-bind="validateInfos.timeOfEntry" label-align="left">
        <a-date-picker
          v-model:value="formState.timeOfEntry"
          style="width: 100%"
          placeholder="请选择员工入职时间"
        />
      </a-form-item>
      <a-form-item label="聘用形式" v-bind="validateInfos.formOfEmployment" label-align="left">
        <a-select v-model:value="formState.formOfEmployment" :options="options" placeholder="请选择员工聘用形式" />
      </a-form-item>
      <a-form-item label="工号" v-bind="validateInfos.workNumber" label-align="left">
        <a-input v-model:value.trim="formState.workNumber" placeholder="请输入员工工号" />
      </a-form-item>
      <a-form-item label="部门" v-bind="validateInfos.departmentName" label-align="left">
        <a-cascader
          v-model:value="formState.departmentName"
          :options="departmentsOptions"
          change-on-select
          placeholder="请选择员工部门"
          expand-trigger="hover"
          :allow-clear="false"
          @focus="onDepartmentFocus"
        >
          <template v-if="loading" #suffixIcon>
            <RedoOutlined spin />
          </template>
        </a-cascader>
      </a-form-item>
      <a-form-item label="转正时间" v-bind="validateInfos.correctionTime" label-align="left">
        <a-date-picker
          v-model:value="formState.correctionTime"
          style="width: 100%"
          placeholder="请选择员工转正时间"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { RedoOutlined } from '@ant-design/icons-vue'
import { employeesApi, departmentsApi } from '../api'
import { employmentOptions, useCheckTime } from '../useStateForm'
import { useLoading } from '@/composables/useToggle.js'
import { useLoadingRequest } from '@/composables/useInitRequest.js'
import { transformTree } from '@/utils/function.js'

const formState = reactive({
  username: '',
  mobile: '',
  formOfEmployment: [],
  workNumber: '',
  departmentName: [],
  timeOfEntry: '',
  correctionTime: ''
})

const formRules = {
  username: [{ required: true, message: '请填写员工姓名' }],
  mobile: [{ required: true, message: '请填写员工手机号' }],
  formOfEmployment: [{ required: true, message: '请选择员工聘用形式' }],
  workNumber: [{ required: true, message: '请输入员工工号' }],
  departmentName: [{ required: true, message: '请选择员工所在部门' }],
  timeOfEntry: [{ required: true, message: '请选择员工入职时间' }],
  correctionTime: [{ required: true, message: '请选择员工转正时间' }]
}

const { loading, setLoading } = useLoading()

const departmentsOptions = ref([])

const options = [
  { label: '非正式', value: '0' },
  { label: '正式', value: '1' }
]

const { resetFields, validateInfos, validate } = Form.useForm(formState, formRules)

const pageInfo = reactive({
  page: 1,
  size: 10
})

const modalVisible = ref(false)

const modalTitle = ref('添加员工')

const onShowModal = (title) => {
  title = typeof title === 'string' ? title : ''
  modalVisible.value = true
  modalTitle.value = title || '添加员工'
}

const onSubmit = async () => {
  if (!(await validate())) return
  try {
    if (modalTitle.value === '添加员工') {
      console.log(formState)
      // await employeesApi
    } else {
    }
    message.success(modalTitle.value + '成功')
    getData()
  } finally {
  }
}

const onDepartmentFocus = () => {
  if (loading.value || departmentsOptions.value.length) return
  setLoading(true)
  setTimeout(async () => {
    try {
      const { depts } = await departmentsApi.get()
      const data = depts.map(item => ({ value: item.name, label: item.name, id: item.id, pid: item.pid }))
      departmentsOptions.value = transformTree(data)
    } finally {
      setLoading()
    }
  }, 500)
}


const { data, getData } = useLoadingRequest(() => employeesApi.get(pageInfo))
</script>

<style lang="less" scoped>
.header {
  .ant-btn {
    padding: 0 10px;
  }
}
</style>
