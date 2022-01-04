import { useApi } from '@/api'

export const loginApi = useApi('/sys/login')

export const userInfoApi = useApi('/sys/profile')
