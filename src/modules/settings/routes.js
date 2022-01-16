export default [
  {
    path: '/settings',
    name: 'settings',
    meta: {
      title: '公司设置',
      icon: 'shezhi'
    },
    component: () => import('./pages/list.vue')
  }
]
