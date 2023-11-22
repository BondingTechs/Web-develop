import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const { idCard, positive, negative } = await readBody(event)
    const {
      code,
      message = '',
      data = {},
    }: any = await request.post('/user/identity-verify', {
      idCard,
      positiveId: positive,
      negativeId: negative,
    })
    return { error: code !== 1000, code, message, data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
