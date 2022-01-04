<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-logo flex flex-sc">
        <img src="../../assets/common/login-logo.png" alt="">
      </div>
      <a-form :label-col="labelCol">
        <a-form-item v-bind="validateInfos.mobile">
          <a-input v-model:value="modelRef.mobile" placeholder="请输入手机号">
            <template #prefix>
              <UserOutlined style="color:#889aa4;" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <a-input v-model:value="modelRef.password" :type="iptType ? 'text' : 'password'" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined style="color:#889aa4;" />
            </template>
            <template #suffix>
              <EyeFilled v-if="iptType" style="color:#889aa4;" @click="changeType" />
              <EyeInvisibleFilled v-else style="color:#889aa4;" @click="changeType" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button block type="primary" :loading="isLoading" @click.prevent="onSubmit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { UserOutlined, LockOutlined, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons-vue'
import { loginApi, userInfoApi } from './api'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const useForm = Form.useForm
const iptType = ref(false)
const isLoading = ref(false)
const store = useStore()
const router = useRouter()

const changeType = () => iptType.value = !iptType.value

const modelRef = reactive({
  mobile: '13800000002',
  password: '123456'
})
const rulesRef = reactive({
  mobile: [
    {
      required: true,
      message: '请填写手机号'
    },
    {
      pattern: /^1\d{10}/,
      message: '请填写正确手机号'
    }
  ],
  password: [
    {
      required: true,
      message: '请填写密码'
    },
    {
      min: 6,
      max: 12,
      message: '请填写6-12位密码'
    }
  ]
})
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
const onSubmit = async() => {
  isLoading.value = true
  try {
    await validate()
    const res = await loginApi.post(modelRef)
    store.updateToken(res)
    const userInfo = await userInfoApi.post()
    store.updateUserInfo(userInfo)
    router.push({ name: 'home' })
  } catch(err) {
  } finally {
    isLoading.value = false
  }
}
</script>

<script>
export default {
  name: 'AuthLogin'
}
</script>

<style lang="less" scoped>
.login-container {
  border-top: 1px solid transparent;
  height: 100vh;
  background: url('../../assets/common/login.jpg') center;
  background-size: cover;

  .login-form {
    padding: 35px 35px 15px;
    margin: 200px auto;
    height: 400px;
    width: 520px;

    .ant-form {
      margin-top: 40px;

      :deep(.ant-form-item-explain.ant-form-item-explain-error) {
        color: #FFF;
      }
      :deep(.ant-input),
      .ant-input-affix-wrapper {
        background-color: #d3e4ff;
        color: #68b0fe;
        border: 0;
      }

      .ant-input-affix-wrapper {
        height: 50px;
      }
  
      .ant-btn {
        background-color: #407ffe;
        height: 64px;
        font-size: 24px;
      }
    }
  }
}
</style>
