import request from '@/utils/request'
export default defineEventHandler(async (event: any) => {
  const headers = getHeaders(event)
  const { authorization } = headers
  const method = event.req.method
  const isMultipart =
    headers['content-type']?.split('/').shift() === 'multipart'

  if (method === 'POST' && !isMultipart) {
    const body = await readBody(event)
    if (body?.server) request.server = true
    else delete request?.server
  }
  if (authorization) request.defaults.headers.Authorization = authorization
  else request.defaults.headers.Authorization = ''
})
