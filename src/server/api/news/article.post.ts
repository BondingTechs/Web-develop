import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const { slug } = await readBody(event)

    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/news/article/info', {
      slug,
      client: !request?.server,
    })
    return { error: code !== 1000, code, message, data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
