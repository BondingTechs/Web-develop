import { useBaseStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { storage } from '../utils'
// import { isServer } from '../utils/runtimeSide'

const fetchConfig = {
  baseURL: '/api',
}

// 請求體封裝
function useGetFetchOptions(options: any = {}) {
  options.baseURL = options.baseURL ?? fetchConfig.baseURL
  options.headers = options.headers ?? {}
  options.initialCache = options.initialCache ?? false
  options.lazy = options.lazy ?? false
  options.async = options.async ?? false

  if (process.server)
    options.body = { ...options.body, server: true }

  if (options.multipart) {
    options.headers = {
      ...options.headers,
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':
        'origin,X-Requested-With,content-type,accept',
      'Access-Control-Allow-Credentials': 'true',
    }
    delete options.headers['Content-Type']
  }

  // generate store information
  const { user, ip } = useBaseStore()

  // insert token
  const { token: tokenStore } = storeToRefs(user)
  const token = tokenStore.value || storage.get('token')
  if (token)
    options.headers.Authorization = token
  else delete options.headers.Authorization

  // insert ip address information
  const { info: ipInfo }: any = storeToRefs(ip)
  if (ipInfo.value) {
    options.headers.ip = ipInfo.value.ip
  }

  return options
}

// http請求封裝
export async function useHttp(key: any, url: any, options: any = {}) {
  // console.log(url, options.headers?.Authorization)
  options = useGetFetchOptions(options)
  options.key = key

  if (options.async) {
    const res: any = await useAsyncData(key, () =>
      $fetch(fetchConfig.baseURL + url, { ...options }),
    )

    return { ...res }
  }

  if (options.$) {
    const data = ref(null)
    const error = ref(null)
    return await $fetch(url, options)
      .then((res: any) => {
        data.value = res.data
        return {
          data,
          error,
        }
      })
      .catch((err) => {
        const msg = err?.data?.data
        if (process.client)
          console.error('服務端錯誤')
        // const { message } = createDiscreteApi(['message'])
        // message.error(msg || '服務端錯誤')

        error.value = msg
        return {
          data,
          error,
        }
      })
  }

  const res = await useFetch(url, {
    ...options,
    onRequest({ options }) {
      return useGetFetchOptions(options)
    },
    // 相當於響應攔截器
    transform: (res: any) => {
      return res.data
    },
  })

  // 同步伺服器error code...等
  // if (res.data.value.code && res.data.value.code !== 1000)
  //   res.error.value = true

  // 客戶端錯誤處理
  // if (process.client && error.value) {
  //   const msg = error.value?.data?.data
  //   if (!options.lazy)
  //     console.error(`服務端錯誤: ${msg}`)
  //     // const { message } = createDiscreteApi(['message'])
  //     // message.error(msg || '服務端錯誤')
  // }

  // console.log(res.data)
  // res.data.value = res.data.value?.data

  // const message = ref(res.data.value?.message)

  return res
}

// GET請求
export function useHttpGet(key: any, url: any, options: any = {}) {
  options.method = 'GET'
  return useHttp(key, url, options)
}

// POST請求
export function useHttpPost(key: any, url: any, options: any = {}) {
  options.method = 'POST'
  return useHttp(key, url, options)
}

// $fetch封裝
export async function useHttpFetch(url: string, options: any = {}) {
  options = useGetFetchOptions(options)
  // console.log(url, options.headers?.Authorization)

  const {
    error,
    code,
    message = '',
    data = null,
  }: any = await $fetch(fetchConfig.baseURL + url, { ...options })
  // 同步伺服器error code...等
  if (error && code === 1005) {
    const router = useRouter()
    router.replace('/')
  }

  return {
    code,
    error,
    message,
    data,
  }
}

// $fetch GET請求
export function useHttpFetchGet(url: string, options: any = {}) {
  return useHttpFetch(url, options)
}

// $fetch POST請求
export function useHttpFetchPost(url: string, options: any = {}) {
  options.method = 'POST'
  return useHttpFetch(url, options)
}
