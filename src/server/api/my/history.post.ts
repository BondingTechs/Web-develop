import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const {
      keyWord,
      size,
      page,
      order,
      sort,
      category,
      type = 'article',
    } = await readBody(event)
    const {
      code,
      message = '',
      data,
    }: any = await request.post('/my/history', {
      keyWord,
      size,
      page,
      order,
      sort,
      category,
      type,
    })
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
