import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { area, phone, password, passwordConfirm, verifyCode } = body

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
      {
        key: 'password',
        label: '密碼',
        message: '密碼格式錯誤',
      },
      {
        key: 'passwordConfirm',
        message: '兩次密碼不一致',
      },
      {
        key: 'verifyCode',
        message: '請輸入驗證碼',
      },
    ]

    const validateRule = (rule: any) => {
      const value = body[rule.key] || ''
      if (!value) {
        throw createError({
          message: rule.message,
        })
      }
      if (rule.regex && !rule.regex.test(value)) {
        throw createError({
          message: rule.message,
        })
      }
    }

    await Promise.all(rules.map(async (rule) => await validateRule(rule)))
    const {
      code,
      message = '',
      data = {},
    } = await request.post('/auth/forgot', {
      area,
      phone,
      password,
      passwordConfirm,
      verifyCode,
    })
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
