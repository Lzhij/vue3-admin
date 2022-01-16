<template>
  <div class="ad-wrapper">
    <a-card>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="角色管理">
          <div class="set-list">
            <a-row style="margin-bottom: 15px">
              <a-col>
                <a-button type="primary" class="fs-14" @click="onAddRole">
                  + 新增角色
                </a-button>
              </a-col>
            </a-row>

            <a-table :data-source="roleList" row-key="id" bordered :pagination="false">
              <a-table-column title="序号" :width="80">
                <template #default="{ index }">
                  {{ index + 1 }}
                </template>
              </a-table-column>
              <a-table-column title="角色名" data-index="name" />
              <a-table-column title="描述" data-index="description" />
              <a-table-column title="操作" :width="200" align="center">
                <template #default="{ record: { id } }">
                  <a href="javascript:;" class="color-primary m-lr-6 fs-12" @click="onSetPermission(id)">分配权限</a>
                  <a href="javascript:;" class="color-primary m-lr-6 fs-12" @click="onEditRole(id)">修改</a>
                  <a href="javascript:;" class="color-primary m-lr-6 fs-12" @click="onDelete(id)">删除</a>
                </template>
              </a-table-column>
            </a-table>
            <a-row type="flex" justify="end" style="margin-top: 10px;">
              <a-pagination
                v-model:current="queryInfo.page" 
                v-model:pageSize="queryInfo.pagesize" 
                size="small"
                :total="queryInfo.total"
                :page-size-options="['10', '20', '30']"
                :show-total="total => `共 ${total} 条`"
                show-size-changer
                show-quick-jumper
                @change="loadModel"
                @showSizeChange="loadModel"
              />
            </a-row>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="公司信息" force-render>
          <a-form v-if="companyState.id" :label-col="labelCol" :wrapper-col="wrapperCol" style="width: 500px;margin-left: 100px;">
            <a-form-item label="企业名称">
              <a-input disabled :value="companyState.name" />
            </a-form-item>
            <a-form-item label="公司地址">
              <a-input disabled :value="companyState.companyAddress" />
            </a-form-item>
            <a-form-item label="公司电话">
              <a-input disabled :value="companyState.companyPhone" />
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input disabled :value="companyState.mailbox" />
            </a-form-item>
            <a-form-item label="备注">
              <a-input disabled :value="companyState.remarks" />
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="title" width="40%" @cancel="onModalClose" @ok="onSubmitRole">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="角色名称" v-bind="validateInfos.name">
          <a-input v-model:value.trim="formState.name" placeholder="情输入角色名称" />
        </a-form-item>
        <a-form-item label="角色描述" v-bind="validateInfos.description">
          <a-input v-model:value.trim="formState.description" placeholder="情输入角色描述" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="mVisible" title="权限分配" @cancel="onPermissionCancel" @ok="onPermissionOk">
      <a-tree 
        v-if="permissionList.length"
        v-model:checkedKeys="checkKeys"
        :tree-data="permissionList"
        default-expand-all
        :selectable="false"
        checkable
        @check="onCheck"	
      >
        <template #title="{name}">
          {{ name }}          
        </template>
      </a-tree>
      <div v-else class="load-box">
        <a-spin size="large" />
        加载中...
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref, createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Form, message, Modal } from 'ant-design-vue'
import { loadData, transformTree } from '@/utils/function.js'
import { rolesApi, companyApi, permissionApi, setPermissionApi } from '../api'

const useForm = Form.useForm

const companyState = reactive({})

const roleList = ref([{ id: 1 }])

const activeKey = ref('1')

const roleId = ref(null)

const modalVisible = ref(false)

const mVisible = ref(false)

const title = ref('添加角色')

const permissionList = ref([])

const permissionKeys = ref([])

const checkKeys = ref([])

let formState = reactive({
  name: '',
  description: ''
})

const formRules = {
  name: [{ required: true, message: '请输入角色名称' }],
  description: [{ required: true, message: '请输入角色描述' }]
}

const queryInfo = reactive({
  page: 1,
  pagesize: 10,
  total: 0
})

const { resetFields, validate, validateInfos } = useForm(formState, formRules)

const onCheck = function() {
  const keys = arguments[1].checkedNodes.map(item => item.props.id)
  permissionKeys.value = keys
}

const onAddRole = () => {
  modalVisible.value = true
  title.value = '添加角色'
}

const onEditRole = async (id) => {
  roleId.value = id
  try {
    const data = await rolesApi.get(null, id)
    Object.assign(formState, data)
    title.value = '编辑角色'
    modalVisible.value = true
  } catch {}
}

const onPermissionCancel = () => permissionKeys.value = checkKeys.value = []

const onPermissionOk = async() => {
  const body = { id: roleId.value, permIds: permissionKeys.value }
  try {
    await setPermissionApi.put(body)
    mVisible.value = false
    message.success('权限分配成功')
    onPermissionCancel()
  } catch {}
}

const onModalClose = () => resetFields()

const onSubmitRole = async () => {
  if (!(await validate())) return
  try {
    if (title.value === '添加角色') {
      await rolesApi.post(formState)
    } else {
      await rolesApi.put(formState, roleId.value)
    }
    loadModel()
    message.success(title.value + '成功')
    modalVisible.value = false
    onModalClose()
  } catch (err) {}
}

const onDelete = (id) => {
  Modal.confirm({
    icon: createVNode(ExclamationCircleOutlined),
    content: '是否要删除该角色?',
    onOk: async() => {
      try {
        await rolesApi.remove(id)
        message.success('删除成功')
        loadModel()
      } catch {}
    }
  })
}

const onSetPermission = async(id) => {
  roleId.value = id
  mVisible.value = true
  try {
    const list = await permissionApi.get()
    permissionList.value = transformTree(list, '0')
    console.log(permissionList.value);
  } catch {}
}

const loadModel = () =>
  loadData(() =>
    rolesApi.get(queryInfo).then((res) => {
      const { rows, total } = res
      console.log(rows)
      roleList.value = rows
      queryInfo.total = total
    })
  )

loadModel()

companyApi.get().then(res => {
  Object.assign(companyState, res[0])
})
</script>

<style lang="less" scoped>
.set-list {
  padding: 30px 20px 0;
}

.load-box {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #efefef;
}
</style>
