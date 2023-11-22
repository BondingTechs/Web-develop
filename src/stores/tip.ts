import { useHttpFetchPost } from '@/composables/useHttp'
import storage from '@/utils/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTipStore = defineStore('tip', () => {
  const info = ref<any>(null)

  // 獲取用戶信息
  async function get() {
    try {
      const tip = await useHttpFetchPost('/tip/today')
      const { data, error } = tip
      if (!error && data !== null) {
        const $show = useState('tip.show', () => false)
        const $tip = useState('tip.data')
        $show.value = true
        $tip.value = {
          id: data.id,
          title: data.title,
          content: data.content,
          publishDate: data.publishDate,
        }
        return data
      }
    }
    catch (e) {
      // console.error(e)
    }
  }

  // 清除用戶
  function clear() {
    storage.remove('today_tip')
    info.value = {}
  }

  return {
    info,
    get,
    clear,
  }
})
