import axios from 'axios'
/**
 * @instance axios 實體，方便進行 config 及攔截器的管理
 */
const config: any = useRuntimeConfig()

const request: any = axios.create({
  baseURL: config.public.apiUpload,
  timeout: 5000,
})

export default defineEventHandler(async (event) => {
  try {
    event.node.res.setHeader('content-type', 'image/png')
    const { date, file } = await getRouterParams(event)
    const path = `/public/uploads/${date}/${file}`
    const { data } = await request.get(path, {
      responseType: 'stream',
    });
    return sendStream(event, data)

  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})