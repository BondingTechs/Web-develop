import { useHttpFetchPost } from '@/composables/useHttp';
import storage from '@/utils/storage';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { passwordRegex } from '../utils/regex';
import { useTipStore } from './tip';

interface User {
  id: number
  headImg: string
  firstName: String
  lastName: String
  phone: string
  email: string
  birthday: string
  gender: string
  idCard: string
  intro: string
  emailStatus: number
  identityStatus: number
}

export const useUserStore = defineStore('user', () => {
  // 標識
  const token = ref<string>('')

  // 設置標識
  function setToken(data: {
    token: string
    expire: string
    refreshToken: string
    refreshExpire: string
  }) {
    // 請求的唯一標識
    token.value = data.token
    storage.set('token', data.token, data.expire)
    // 更新 token 的唯一標識
    storage.set('refreshToken', data.refreshToken, data.refreshExpire)
  }

  // 監聽登入狀態
  const isLogin = ref(false)

  // 更新標識
  async function refreshToken(token: String) {
    try {
      const { data, error }: any = await useHttpFetchPost('/auth/refresh', {
        body: { refreshToken: token },
      })
      if (!error) {
        setToken(data)
        await get()
      }
    }
    catch (e) {
      logout()
    }
  }

  // 用戶信息
  const info = ref<User | any>(null)

  // 獲取用戶信息
  async function get() {
    if (info.value && token.value) {
      return info.value
    }
    const { code, error, data } = await useHttpFetchPost('/user/person')
    if (error) {
      if (code === 1005) {
        const storeRefreshToken = storage.get('refreshToken')
        await refreshToken(storeRefreshToken)
      }
      else {
        clear()
      }
    }
    else if (!error) {
      set(data)
    }
    return data
  }

  // 設置用戶信息
  function set(value: any) {
    isLogin.value = true
    info.value = value
    storage.set('userInfo', value)
  }

  // 修改用戶信息
  async function update(form: any) {
    const $alert = useState('alert')

    const updatePick = (({ firstName, lastName, birthday, gender, intro }) => ({
      firstName,
      lastName,
      birthday,
      gender,
      intro,
    }))(info.value)

    if (JSON.stringify(form) === JSON.stringify(updatePick)) {
      return ($alert.value = {
        type: 'info',
        text: '未修改個人資料',
        center: true,
      })
    }

    const $loading = useState('loading')
    $loading.value = true

    const { error, message }: any = await useHttpFetchPost('/user/update', {
      body: {
        firstName: form.firstName,
        lastName: form.lastName,
        birthday: form.birthday,
        gender: form.gender,
        intro: form.intro,
      },
    })
    $loading.value = false

    if (error)
      return ($alert.value = { type: 'error', text: message, center: true })

    updateField({
      firstName: form.firstName,
      lastName: form.lastName,
      birthday: form.birthday,
      gender: form.gender,
      intro: form.intro,
    })
    $alert.value = { type: 'success', text: '個人資料已更新', center: true }
  }

  // 設置用戶信息
  function updateField(obj: any) {
    for (const key in obj)
      info.value[key] = obj[key]

    storage.set('userInfo', info.value)
  }

  // 登入
  async function login(loginForm: {
    area: string
    phone: string
    password: string
    rememberMe: boolean
  }) {
    const { data, error, message }: any = await useHttpFetchPost(
      '/auth/login',
      {
        body: {
          area: loginForm.area,
          phone: loginForm.phone,
          password: loginForm.password,
        },
      },
    )
    const $alert = useState('alert')
    const $auth = useState<boolean>('showAuth', () => false)
    if (error && message) {
      $alert.value = { type: 'error', text: message, center: true }
    }
    else {
      $auth.value = false
      await setToken(data)

      await get()
      const tip = useTipStore()
      await tip.get()
      $alert.value = { type: 'success', title: '登入成功' }
      if (loginForm.rememberMe)
        storage.set('loginData', loginForm)
      else storage.remove('loginData')
    }
  }

  // 註冊
  async function register(registerForm: {
    firstName: string
    lastName: string
    birthday: string
    area: string
    phone: string
    password: string
    passwordConfirm: string
    gender: number
    verifyCode: string
  }) {
    const $alert = useState('alert')
    if (!passwordRegex.test(registerForm.password)) {
      return ($alert.value = {
        type: 'error',
        text: '密碼須為英數混合8位數以上',
        center: true,
      })
    }

    const { error, message, data } = await useHttpFetchPost('/auth/register', {
      body: {
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        birthday: registerForm.birthday,
        area: registerForm.area,
        phone: registerForm.phone,
        password: registerForm.password,
        gender: registerForm.gender,
        passwordConfirm: registerForm.passwordConfirm,
        verifyCode: registerForm.verifyCode,
      },
    })
    const $auth = useState<boolean>('showAuth', () => false)
    if (error && message) {
      $alert.value = { type: 'error', text: message, center: true }
    }
    else {
      $auth.value = false
      await setToken(data)

      await get()
      const tip = useTipStore()
      await tip.get()
      $alert.value = { type: 'success', title: '登入成功' }
      if (data.rememberMe)
        storage.set('loginData', data)
      else storage.remove('loginData')
    }
    if (error) {
      const $alert = useState('alert')
      $alert.value = {
        type: 'error',
        title: '驗證錯誤',
        text: message,
        center: true,
      }
    }

    return { error, message, data }
  }

  // 忘記密碼
  async function forgot(forgotForm: {
    area: string
    phone: string
    password: string
    passwordConfirm: string
    verifyCode: string
  }) {
    const $alert = useState('alert')
    if (!passwordRegex.test(forgotForm.password)) {
      return ($alert.value = {
        type: 'error',
        text: '密碼須為英數混合8位數以上',
        center: true,
      })
    }
    const { error, message, data } = await useHttpFetchPost('/auth/forgot', {
      body: {
        area: forgotForm.area,
        phone: forgotForm.phone,
        password: forgotForm.password,
        passwordConfirm: forgotForm.passwordConfirm,
        verifyCode: forgotForm.verifyCode,
      },
    })
    const $auth = useState<boolean>('showAuth', () => false)
    if (error && message) {
      $alert.value = { type: 'error', text: message, center: true }
    }
    else {
      $auth.value = false
      await setToken(data)

      await get()
      $alert.value = { type: 'success', title: '修改成功，已登入' }
      if (data.rememberMe)
        storage.set('loginData', forgotForm)
      else storage.remove('loginData')
    }
    if (error) {
      const $alert = useState('alert')
      $alert.value = {
        type: 'error',
        title: '驗證錯誤',
        text: message,
        center: true,
      }
    }

    return { error, message, data }
  }

  // 登出
  async function logout() {
    const $alert = useState('alert')
    await useHttpFetchPost('/user/logout')
    $alert.value = {
      type: 'success',
      title: '登出成功',
    }

    const route = useRoute()
    if (route.meta.auth) {
      const router = useRouter()
      router.push('/')
    }
    clear()
  }

  // 清除用戶
  async function clear() {
    return await new Promise((resolve) => {
      storage.remove('userInfo')
      storage.remove('token')
      storage.remove('refreshToken')

      isLogin.value = false
      info.value = null
      token.value = ''

      const route: any = useRoute()
      const router: any = useRouter()
      const middleware = route.meta.middleware ?? []
      if (middleware && middleware.includes('auth'))
        router.push('/')
      resolve('')
    })
  }

  return {
    token,
    info,
    isLogin,
    get,
    set,
    update,
    updateField,
    login,
    register,
    forgot,
    logout,
    clear,
    setToken,
    refreshToken,
  }
})
