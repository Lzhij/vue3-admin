export default [
  {
    path: '/employees',
    name: 'employees',
    meta: {
      title: '员工',
      icon: 'people'
    },
    component: () => import('./pages/list.vue')
  }
]