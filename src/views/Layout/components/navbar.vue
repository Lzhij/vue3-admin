<template>
  <a-layout-header class="layout-header">
    <div class="icon">
      <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="changeCollapsed" />
      <menu-fold-outlined v-else class="trigger" @click="changeCollapsed" />
    </div>
    <div class="nav-list">
      <div class="l-list">
        <div class="nav-title">
          江苏传智播客教育科技股份有限公司
        </div>
        <div class="nav-tag">
          体验版
        </div>
      </div>
      <div class="r-list">
        <div class="nav-avatar m-r-10">
          <img src="@/assets/common/bigUserHeader.png">
        </div>
        <a-dropdown class="nav-down">
          <div class="nav-user-name" @click.prevent>
            {{ userInfo.username }}
            <DownOutlined style="color: #fff; font-size: 18px" />
          </div>
          <template #overlay>
            <a-menu @click="onClick">
              <a-menu-item key="1">
                <div class="menu-txt" @click="$router.push('/home')">
                  首页
                </div>
              </a-menu-item>
              <a-menu-item key="2">
                <div class="menu-txt" @click="logout">
                  退出登录
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useStore } from '@/store'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const { clearToken, state: { userInfo } } = useStore()

const router = useRouter()

const emits = defineEmits(['update:collapsed'])

const logout = () => {
  clearToken()
  router.push({ name: 'login' })
  message.success('已退出登录')
}

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const changeCollapsed = () => emits('update:collapsed', !props.collapsed)
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  height: 50px;
  padding: 0 10px;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);

  .icon {
    .trigger {
      font-size: 14px;
      line-height: 60px;
      color: #fff;
      cursor: pointer;
      transition: color 0.3s;
    }
  }

  .nav-list {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .l-list {
      margin-left: 15px;
      display: flex;
      flex: 1;

      .nav-title {
        line-height: 50px;
        font-size: 18px;
        color: #fff;
      }

      .nav-tag {
        margin: 10px;
        padding: 0 10px;
        background-color: #84a9fe;
        height: 30px;
        line-height: 30px;
        color: #fff;
        border-radius: 10px;
      }
    }

    .r-list {
      display: flex;
      justify-content: end;
      align-items: center;
      .nav-avatar {
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .nav-user-name {
        cursor: pointer;
        color: #fff;
      }
    }
  }
}
</style>
