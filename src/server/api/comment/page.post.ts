import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const { articleId, parentId, page = 1, size = 10 } = await readBody(event)
    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/news/article/comment/page', {
      articleId,
      parentId,
      page,
      size,
    })
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
