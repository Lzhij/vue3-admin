import { createApp } from 'vue'
import router from '@/router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import './styles/base.less'
import './styles/antd.less'
import myComponents from '@/components'
import mixins from '@/mixins'

const app = createApp(App)

app.mixin(mixins)

app.use(router).use(myComponents).use(Antd).mount('#app')
