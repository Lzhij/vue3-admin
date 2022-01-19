export default [
  {
    path: '/employees',
    name: 'employees',
    meta: {
      title: '员工',
      icon: 'people'
    },
    component: () => import('./pages/list.vue')
  },
  {
    path: '/employees/detail/:id',
    name: 'employees-detail',
    meta: { hidden: true },
    component: () => import('./pages/detail.vue')
  }
]
