import request from '@/utils/request'

export default defineEventHandler(async () => {
  // try {
  try {
    const {
      code,
      message = '',
      data = {},
    }: any = await request.post('/user/person')
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
