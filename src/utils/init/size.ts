export const availableSizes: any = {
  sm: {
    name: '小',
    iso: '14px',
  },
  md: {
    name: '中',
    iso: '16px',
  },
  lg: {
    name: '大',
    iso: '18px',
  },
  xl: {
    name: '超大',
    iso: '20px',
  },
}

export function sizeController() {
  // composable
  const sizeUserSetting = useCookie('size')
  if (!sizeUserSetting.value)
    sizeUserSetting.value = '16px'

  const getUserSize = (): string => sizeUserSetting.value

  // state
  const sizeSetting = useState<string>('size.setting', () => getUserSize())

  // watchers
  watch(sizeSetting, (val) => {
    sizeUserSetting.value = val
    document.documentElement.style.fontSize = sizeSetting.value
  })

  // init locale
  const init = () => {
    sizeSetting.value = getUserSize()
    if (sizeSetting.value)
      document.documentElement.style.fontSize = sizeSetting.value
  }

  // lifecycle
  onBeforeMount(() => init())

  return {
    sizeSetting,
    init,
  }
}
