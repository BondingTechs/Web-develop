import request from '@/utils/request'

export default eventHandler(async () => {
  try {
    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/tip/today', { client: !request?.server })
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
