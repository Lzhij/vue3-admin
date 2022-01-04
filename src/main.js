import { createApp } from 'vue'
import router from '@/router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import './styles/base.less'
import './styles/antd.less'

createApp(App).use(router).use(Antd).mount('#app')
