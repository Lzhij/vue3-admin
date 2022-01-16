<template>
  <div class="ad-wrapper">
    <a-card>
      <a-tabs>
        <a-tab-pane key="1" tab="组织架构">
          <div class="d-tree">
            <a-row class="d-row" type="flex" justify="space-between" style="border-bottom: 1px solid #efefef">
              <a-col>
                <div class="d-title">
                  <a-icon name="BankFilled" />
                  {{ tree.companyName || '' }}
                </div>
              </a-col>
              <a-col style="width: 150px">
                <a-row type="flex" justify="space-between">
                  <a-col>负责人</a-col>
                  <a-col>
                    <a-dropdown placement="bottomRight">
                      <div class="d-settings">
                        操作
                        <a-icon name="DownOutlined" />
                      </div>
                      <template #overlay>
                        <a-menu>
                          <a-menu-item>
                            <div class="color-primary" @click="onChangeDepartment">
                              添加子部门
                            </div>
                          </a-menu-item>
                        </a-menu>
                      </template>
                    </a-dropdown>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <a-tree
              v-if="tree.treeData.length"
              :tree-data="tree.treeData"
              default-expand-all
              block-node
              :selectable="false"
            >
              <template #title="{ name, manager, id }">
                <a-row type="flex" justify="space-between">
                  <a-col>
                    <a-dropdown :trigger="['contextmenu']">
                      <span>
                        <ad-icon name="nanren" size="20px" />
                        {{ name }}
                      </span>
                    </a-dropdown>
                  </a-col>
                  <a-col style="width: 150px">
                    <a-row type="flex" justify="space-between">
                      <a-col :span="8" style="text-align: right">
                        {{ manager }}
                      </a-col>
                      <a-col>
                        <a-dropdown placement="bottomRight">
                          <div class="d-settings">
                            操作
                            <a-icon name="DownOutlined" />
                          </div>
                          <template #overlay>
                            <a-menu class="d-menu">
                              <a-menu-item>
                                <div class="color-primary" @click="onChangeDepartment(id)">
                                  添加子部门
                                </div>
                              </a-menu-item>
                              <a-menu-item>
                                <div class="color-primary" @click="onChangeDepartment(id, '编辑部门')">
                                  编辑部门
                                </div>
                              </a-menu-item>
                              <a-menu-item>
                                <div class="color-primary" @click="onDeleteDepartment(id)">
                                  删除部门
                                </div>
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </template>
            </a-tree>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="modalTitle" width="40%" @ok="handleOk" @cancel="closeHandle">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="部门名称" v-bind="validateInfos.name">
          <a-input v-model:value.trim="formState.name" />
        </a-form-item>
        <a-form-item label="部门编码" v-bind="validateInfos.code">
          <a-input v-model:value.trim="formState.code" />
        </a-form-item>
        <a-form-item label="部门负责人" v-bind="validateInfos.manager">
          <a-select ref="select" v-model:value="formState.manager" :options="employeesOptions" style="width: 100%" />
        </a-form-item>
        <a-form-item label="部门介绍" v-bind="validateInfos.introduce">
          <a-input v-model:value.trim="formState.introduce" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref, createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Form, message, Modal } from 'ant-design-vue'
import { departmentsApi, employeesApi } from '../api'
import { transformTree, loadData } from '@/utils/function.js'

const useForm = Form.useForm

const tree = reactive({ treeData: [] })

let employeesOptions = ref([])

const modalTitle = ref('添加部门')

const pid = ref('')

let formState = reactive({
  code: '',
  introduce: '',
  manager: [],
  name: ''
})

const formRules = reactive({
  code: [
    { required: true, message: '请填写部门编码' },
    { max: 8, message: '部门编码最长8个字符' }
  ],
  name: [
    { required: true, message: '请填写部门名称' },
    { max: 8, message: '部门名称最长输入8个字符' }
  ],
  manager: [{ required: true, message: '请选择部门负责人' }],
  introduce: [{ required: true, message: '请填写部门描述' }]
})

const { resetFields, validate, validateInfos } = useForm(formState, formRules)

const modalVisible = ref(false)

const onChangeDepartment = async (id, title = '') => {
  id = typeof id === 'string' ? id : ''
  pid.value = id
  if (title) {
    modalTitle.value = title
    const { name, introduce, manager, code } = await departmentsApi.get(null, id)
    Object.assign(formState, { name, introduce, manager, code })
  } else {
    modalTitle.value = '添加部门'
  }
  modalVisible.value = true
}

const onDeleteDepartment = (id) => {
  Modal.confirm({
    icon: createVNode(ExclamationCircleOutlined),
    content: '确认删除该部门嘛~',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        const res = await departmentsApi.remove(id)
        reload()
        message.success('操作成功')
      } catch (e) {}
    }
  })
}

const handleOk = async () => {
  if (!(await validate())) return
  // 添加部门提交
  try {
    if (modalTitle.value === '添加部门') {
      const data = { ...formState, pid: pid.value }
      await departmentsApi.post(data)
    } else {
      // 编辑部门提交
      await departmentsApi.put(formState, pid.value)
    }
    modalVisible.value = false
    reload()
    message.success(modalTitle.value + '成功')
  } catch (e) {}
}

const closeHandle = () => {
  resetFields()
}

employeesApi.get().then((res) => {
  employeesOptions.value = res.map((item) => ({ value: item.username, label: item.username }))
})

const reload = () => loadData(() =>
  departmentsApi.get().then((res) => {
    const { depts } = Object.assign(tree, res)
    tree.treeData = transformTree(depts)
  })
)

reload()
</script>

<style lang="less" scoped>
.d-tree {
  padding: 30px 100px;
  :deep(li) {
    line-height: 2;
  }

  .d-title {
    font-weight: bold;
  }

  .d-settings {
    cursor: pointer;
  }

  .d-row {
    padding-bottom: 10px;
  }
  .d-menu {
    .ant-menu-item-active {
      color: #0094ff;
    }
  }
}
</style>
