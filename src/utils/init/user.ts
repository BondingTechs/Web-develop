import { useBaseStore } from '@/stores'
import { storeToRefs } from 'pinia'
import storage from '../storage'

export async function userController() {
  const isLogin = useState('isLogin', () => false)
  const route: any = useRoute()
  const router = useRouter()
  isLogin.value = false

  const token = storage.get('token')

  if (token) {
    const { user, tip } = useBaseStore()
    const { token: userToken } = storeToRefs(user)
    userToken.value = token
    const userInfo = await user.get()
    isLogin.value = true
    tip.get()
    return {
      token,
      info: userInfo,
    }
  }

  const $alert = useState('alert')
  if (
    route.meta.auth
    && !isLogin.value
  ) {
    setTimeout(() => {
      $alert.value = {
        type: 'info',
        title: '請重新登入',
        action: () => {
          router.push('/')
        },
      }
    }, 500)
  }

  return { token }
}
