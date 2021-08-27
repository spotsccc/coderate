import { LoginBody } from '@server/modules/auth/types'
import axios from 'axios'

const api = axios.create({ url: 'localhost:2020', withCredentials: true })

export const login = (req: LoginBody) => api.post('/api/auth/login', req)
export const signUp = (req: LoginBody) => api.post('/api/auth/sign-up', req)
export const test = () => api.get('/api/test/test')
