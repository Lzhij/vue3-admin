export default {
  path: '/company',
  name: 'company',
  meta: {
    title: 'SAAS企业',
    icon: 'component'
  },
  component: () => import('./pages/list.vue')
}
