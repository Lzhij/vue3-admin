import { useApi } from '@/api'

export const departmentsApi = useApi('/company/department')

export const employeesApi = useApi('/sys/user/simple')
