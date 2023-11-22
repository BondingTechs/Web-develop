import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const { area, phone, password } = await readBody(event)
    const {
      code,
      message = '',
      data = {},
    } = await request.post('/auth/login', { area, phone, password })
    return { error: code !== 1000, code, message, data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
