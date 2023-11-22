import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const {
      code,
      message = '',
      data,
    }: any = await request.post('/location/agent/add', body)
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
