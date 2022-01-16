export default [{
  path: '/departments',
  name: 'departments',
  component: () => import('./pages/index.vue'),
  meta: {
    title: '组织架构',
    icon: 'tree'
  }
}
]