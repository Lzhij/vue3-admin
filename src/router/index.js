import { createRouter, createWebHashHistory } from 'vue-router'
import { beforeEach, afterEach } from './guard'
import Modules from './routes-modules'

const Layout = () => import('views/Layout/index.vue')
const Login = () => import('@/modules/login/index.vue')

const routes = [
  {
    path: '/404',
    name: '404',
    meta: { hidden: true },
    component: () => import('views/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { hidden: true },
    component: Login
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    meta: { hidden: true },
    redirect: '/home',
    children: [...Modules]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(beforeEach)

router.afterEach(afterEach)

export default router
