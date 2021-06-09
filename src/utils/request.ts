import axios from 'axios'
import { Toast } from 'vant'

const service = axios.create({
  baseURL: '',
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
      message: res.data,
      position: 'bottom',
      duration: 1000
    })

    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  (error: Error) => {
    return Promise.reject(error)
  }
)
export default service
