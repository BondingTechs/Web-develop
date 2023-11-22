import request from '@/utils/request'

export default defineEventHandler(async () => {
  try {
    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/industry/category/list')
    return { error: code !== 1000, code, message, data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
