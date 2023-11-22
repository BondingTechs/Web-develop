// import { useAppStore } from './app'
// import { useProcessStore } from './process'
import { useIPStore } from './ip'
import { useTipStore } from './tip'
import { useUserStore } from './user'

export function useBaseStore() {
  const user = useUserStore()
  const tip = useTipStore()
  const ip = useIPStore()

  return {
    // app,
    // process,
    user,
    tip,
    ip
  }
}
