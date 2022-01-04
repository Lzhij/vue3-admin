<template>
  <div class="app-container">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :collapsed-width="50">
        <SideBar v-model:collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <Navbar v-model:collapsed="collapsed" />
        <a-layout-content
          style="padding: 15px"
        >
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Mr_liu 出品 人力资源后台管理系统
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup>
import Navbar from './components/navbar.vue'
import SideBar from './components/sidebar.vue'
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<style lang="less" scoped>
.app-container {
  @color: #5283fd;
  @txt-color: #fff;
  height: 100vh;
  .ant-layout {
    min-height: 100%;
    .ant-layout-sider {
      background: @color url('../../assets/common/leftnavBg.png') no-repeat bottom ;
      box-shadow: 2px 0px 5px rgba(0, 0, 0, .4);
      
      :deep(.ant-menu.ant-menu-dark) {
        background: @color;

        .ant-menu-item {
          color: @txt-color;
        }

        .ant-menu-item-selected {
          background-color: @txt-color;
          color: @color;
        }
      }
    }
  }
}
</style>
