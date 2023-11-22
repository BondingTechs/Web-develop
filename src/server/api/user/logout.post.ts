import request from '@/utils/request'

export default defineEventHandler(async () => {
  try {
    const {
      code,
      message = '',
      data = {},
    }: any = await request.post('/user/logout')
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
