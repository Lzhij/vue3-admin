export default [
  {
    path: '/company',
    name: 'company',
    meta: {
      title: 'SAAS企业',
      icon: 'component'
    },
    component: () => import('./pages/list.vue')
  },
  {
    path: '/company/detail/:id',
    name: 'company-detail',
    meta: { hidden: true },
    component: () => import('./pages/detail.vue')
  }
]
