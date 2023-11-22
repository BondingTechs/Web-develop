import axios from 'axios'
/**
 * @instance axios 實體，方便進行 config 及攔截器的管理
 */
const config: any = useRuntimeConfig()

const request: any = axios.create({
  baseURL: config.public.apiBase,
  timeout: 5000,
})

request.interceptors.request.use(
  (req: any) => {
    return req
  },
)

request.interceptors.response.use(
  async (response: any) => {
    return response.data
  },
  (error: any) => {
    return Promise.reject(error?.response?.data ?? error)
  },
)

export default request
