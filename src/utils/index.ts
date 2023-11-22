import storage from './storage'
import module from './module'

// 首字母大寫
export function firstUpperCase(value: string): string {
  return value.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => {
    return $1.toUpperCase() + $2
  })
}

// 獲取方法名
export function getNames(value: any) {
  return Object.getOwnPropertyNames(value.constructor.prototype)
}

// 深度合併
export function deepMerge(a: any, b: any) {
  let k
  for (k in b) {
    a[k]
      = a[k] && a[k].toString() === '[object Object]'
        ? deepMerge(a[k], b[k])
        : (a[k] = b[k])
  }

  return a
}

// 獲取地址欄參數
export function getUrlParam(name: string): string | null {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const r = window.location.search.substr(1).match(reg)
  if (r != null)
    return decodeURIComponent(r[2])
  return null
}

// 文件路徑轉對象
export function deepFiles(list: any[]) {
  const modules: any = {}

  list.forEach((e) => {
    const arr = e.path.split('/')
    const parents = arr.slice(0, arr.length - 1)
    const name = basename(e.path).replace('.ts', '')

    let curr: any = modules
    let prev: any = null
    let key: any = null

    parents.forEach((k: string) => {
      if (!curr[k])
        curr[k] = {}

      prev = curr
      curr = curr[k]
      key = k
    })

    if (name === 'index')
      prev[key] = e.value
    else curr[name] = e.value
  })

  return modules
}

// 文件名
export function filename(path: string): string {
  return basename(path.substring(0, path.lastIndexOf('.')))
}

// 路徑名稱
export function basename(path: string): string {
  let index = path.lastIndexOf('/')
  index = index > -1 ? index : path.lastIndexOf('\\')
  if (index < 0)
    return path

  return path.substring(index + 1)
}

// 文件擴展名
export function extname(path: string): string {
  return path.substring(path.lastIndexOf('.') + 1)
}

// 橫槓轉駝峰
export function toCamel(str: string): string {
  return str.replace(/([^-])(?:-+([^-]))/g, ($0, $1, $2) => {
    return $1 + $2.toUpperCase()
  })
}

// uuid
export function uuid(): string {
  const s: any[] = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++)
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)

  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'

  return s.join('')
}

// 瀏覽器信息
export function getBrowser() {
  const { clientHeight, clientWidth } = document.documentElement

  // 瀏覽器信息
  const ua = navigator.userAgent.toLowerCase()

  // 瀏覽器類型
  let type = (ua.match(/firefox|chrome|safari|opera/g) || 'other')[0]

  if ((ua.match(/msie|trident/g) || [])[0])
    type = 'msie'

  // 平臺標籤
  let tag = ''

  const isTouch
    = 'ontouchstart' in window || ua.includes('touch') || ua.includes('mobile')
  if (isTouch) {
    if (ua.includes('ipad'))
      tag = 'pad'
    else if (ua.includes('mobile'))
      tag = 'mobile'
    else if (ua.includes('android'))
      tag = 'androidPad'
    else tag = 'pc'
  }
  else {
    tag = 'pc'
  }

  // 瀏覽器內核
  let prefix = ''

  switch (type) {
    case 'chrome':
    case 'safari':
    case 'mobile':
      prefix = 'webkit'
      break
    case 'msie':
      prefix = 'ms'
      break
    case 'firefox':
      prefix = 'Moz'
      break
    case 'opera':
      prefix = 'O'
      break
    default:
      prefix = 'webkit'
      break
  }

  // 操作平台
  const plat
    = ua.indexOf('android') > 0 ? 'android' : navigator.platform.toLowerCase()

  // 屏幕信息
  let screen = 'full'

  if (clientWidth < 768)
    screen = 'xs'
  else if (clientWidth < 992)
    screen = 'sm'
  else if (clientWidth < 1200)
    screen = 'md'
  else if (clientWidth < 1920)
    screen = 'xl'
  else screen = 'full'

  // 是否 ios
  const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  // 瀏覽器版本
  const version = (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]

  // 是否 PC 端
  const isPC = tag === 'pc'

  // 是否移动端
  const isMobile = !isPC

  // 是否移動端 + 屏幕寬過小
  const isMini = screen === 'xs' || isMobile

  return {
    height: clientHeight,
    width: clientWidth,
    version,
    type,
    plat,
    tag,
    prefix,
    isMobile,
    isIOS,
    isPC,
    isMini,
    screen,
  }
}

export { storage, module }
