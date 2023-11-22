import request from '@/utils/request'

export default eventHandler(async (event) => {
  try {
    const { isTop, isHot, size, sort, type, category, articleId }
      = await readBody(event)
    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/news/article/list', {
      isTop,
      isHot,
      size,
      sort,
      type,
      category,
      articleId,
    })
    return { error: code !== 1000, code, message, data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
