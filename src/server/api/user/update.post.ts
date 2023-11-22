import request from '@/utils/request'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { firstName, lastName, intro, birthday, gender } = body

    const rules = [
      {
        key: 'firstName',
        message: '請輸入姓氏',
      },
      {
        key: 'lastName',
        message: '請輸入名字',
      },
      {
        key: 'birthday',
        message: '請輸入生日',
      },
      {
        key: 'gender',
        message: '請輸入性別',
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
    }: any = await request.post('/user/personUpdate', {
      firstName,
      lastName,
      intro,
      birthday,
      gender,
    })
    return { error: code !== 1000, code, message, data }
  } catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})
