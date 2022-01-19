import { useApi } from '@/api'

export const employeesApi = useApi('/sys/user')

export const departmentsApi = useApi('/company/department')

export const employeeBaseInfoApi = (id) => useApi(`/sys/user/${id}`)
