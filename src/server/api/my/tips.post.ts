import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const { keyWord, size, page, order, sort, category } = await readBody(event)
    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/my/tips', {
      keyWord,
      size,
      page,
      order,
      sort,
      category,
    })
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
