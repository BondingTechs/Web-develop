import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const { slug }: any = await readBody(event)
    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/industry/category/info', { slug })
    return { error: code !== 1000, code, message, data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
