<template>
  <a-card>
    <a-tabs>
      <a-tab-pane key="1" tab="企业信息" size="small">
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol" class="c-d-form" style="width:400px;margin-left: 100px;">
          <a-form-item label="企业名称">
            <a-input v-model:value="state.name" disabled />
          </a-form-item>
          <a-form-item label="公司地址">
            <a-input v-model:value="state.companyAddress" disabled />
          </a-form-item>
          <a-form-item label="公司电话">
            <a-input v-model:value="state.companyPhone" disabled />
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model:value="state.mailbox" disabled />
          </a-form-item>
          <a-form-item :wrapper-col="{span:24}">
            <a-row type="flex" justify="center">
              <a-button type="primary" @click="onBack">
                返回
              </a-button>
            </a-row>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { companyApi } from '../api'

const route = useRoute()

const router = useRouter()

const { id } = route.params

const state = reactive({})

const onBack = () => router.back()


const labelCol = { span: 6 }
const wrapperCol = { span: 16 }

companyApi.get(null, id).then(res => {
  Object.assign(state, res)
})
</script>

<style lang="less" scoped>
.c-d-form {
  margin-top: 10px;
}
</style>
