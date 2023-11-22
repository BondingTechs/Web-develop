import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useOffsetWatcher(): { offset: Ref<number> } {
  const offset: Ref<number> = ref(0)

  const watchOffset = (): number =>
    (offset.value = document.documentElement.scrollTop)

  onMounted((): void => {
    window.addEventListener('scroll', watchOffset)
  })

  onBeforeUnmount((): void => {
    window.removeEventListener('scroll', watchOffset)
  })
  return { offset }
}
