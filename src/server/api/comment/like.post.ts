import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const { commentId, articleId } = await readBody(event)
    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/news/article/comment/like', { commentId, articleId })
    return { error: code !== 1000, code, message, data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
