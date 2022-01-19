<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="姓名" v-bind="validateInfos.username">
      <a-input v-model:value.trim="employeeInfo.username" placeholder="请输入姓名" />
    </a-form-item>
    <a-form-item label="密码" v-bind="validateInfos.password">
      <a-input v-model:value.trim="employeeInfo.password" type="password" placeholder="请输入密码" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 6 }">
      <a-button type="primary" class="m-r-10" @click="onUpdate">
        更新
      </a-button>
      <a-button danger @click="onReset">
        取消
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { employeeBaseInfoApi } from '../../api'

const props = defineProps({ id: { type: String, required: true } })

let baseInfo = {}

let basePassword = '000000000000'

const employeeInfo = reactive({
  username: '',
  password: basePassword
})

const rules = {
  username: [
    { required: true, message: '请输入员工姓名' },
    { max: 6, message: '最长6个字符' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, max: 16, message: '请输入6-16位密码' }
  ]
}

const { resetFields, validateInfos, validate } = Form.useForm(employeeInfo, rules)

const onReset = () => {
  resetFields()
  employeeInfo.password = basePassword
  employeeInfo.username = baseInfo.username
}

const onUpdate = async () => {
  if (!(await validate())) return
  const { username, password } = employeeInfo
  if (username === baseInfo.username && password === basePassword) return message.error('你没有修改信息, 请修改后提交')
  baseInfo = { ...baseInfo, username, password }
  basePassword = password
  try {
    const { password } = await employeeBaseInfoApi(props.id).put(baseInfo)
    message.success('更新成功')
  } finally {
  }
}

employeeBaseInfoApi(props.id)
  .get()
  .then((res) => {
    employeeInfo.username = res.username
    baseInfo = res
  })
</script>

<style lang="less" scoped>
.ant-form {
  margin-left: 200px;
  margin-top: 20px;
  width: 400px;
}
</style>
