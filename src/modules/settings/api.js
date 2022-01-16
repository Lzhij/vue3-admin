import { useApi } from '@/api'

export const rolesApi = useApi('/sys/role')

export const companyApi = useApi('/company')

export const permissionApi = useApi('/sys/permission')

export const setPermissionApi = useApi('/sys/role/assignPrem')
