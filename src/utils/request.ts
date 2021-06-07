import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 5000 // request timeout
})

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    const res = response.data

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
