import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const { refreshToken } = await readBody(event)
    const {
      code,
      message = '',
      data = {},
    }: any = await request.post('/auth/refreshToken', { refreshToken })
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
