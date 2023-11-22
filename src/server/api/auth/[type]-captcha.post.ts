// import { phoneRegex } from '@/utils/regex'
import request from '@/utils/request'

export default defineEventHandler(async (event: any) => {
  try {
    const type: any = event.context?.params?.['type-captcha'].replace('-captcha', '')
    const body = await readBody(event)
    const { phone, area } = body

    const rules = [
      {
        key: 'area',
        message: '請選擇地區',
      },
      {
        key: 'phone',
        message: '請輸入手機號碼',
        // regex: phoneRegex,
      },
    ]

    const validateRule = (rule: any) => {
      const value = body[rule.key] || ''
      if (value)
        return

      throw createError({
        message: rule.message,
      })
    }

    await Promise.all(rules.map(async rule => await validateRule(rule)))

    const {
      code,
      message = '',
      data = null,
    }: any = await request.post('/auth/captcha', { area, phone, type })
    return { error: code !== 1000, code, message, data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
