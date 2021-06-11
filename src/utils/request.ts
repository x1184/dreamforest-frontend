import axios, { AxiosError } from 'axios'
import { Toast } from 'vant'

import router from '../routers'

const service = axios.create({
  baseURL: 'http://192.168.11.125:4000/api/dream-forest',
  timeout: 5000 // request timeout
})

service.interceptors.request.use((config: any) => {
  const authorization = localStorage.getItem('authorization')

  if (authorization) {
    config.headers.Authorization = authorization
  }

  return config
})

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    const res = response.data

    Toast({
      message: res.message,
      position: 'bottom',
      duration: 1000
    })

    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error: AxiosError) => {
    const response = error.response

    switch (response.status) {
      case 403:
        router.push('/login')
        break

      case 401:
        router.push('/verify')
        break

      case 404:
        router.push('/404')
        break

      default:
        break
    }

    return Promise.reject(error)
  }
)
export default service
