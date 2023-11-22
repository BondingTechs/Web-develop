import request from '@/utils/request'

export default eventHandler(async (event) => {
  try {
    const { id } = await readBody(event)
    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/tip/collection', { id })
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
