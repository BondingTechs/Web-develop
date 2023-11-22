import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const { articleId, content, parentId } = await readBody(event)
    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/news/article/comment/create', {
      articleId,
      content,
      parentId,
    })
    return { error: code !== 1000, code, message, data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
