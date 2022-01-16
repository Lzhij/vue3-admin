export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('./index.vue'),
    meta: {
      title: '首页',
      icon: 'zhuye'
    }
  }
]
