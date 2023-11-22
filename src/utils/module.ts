/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
interface Item {
  name: string
  options: {
    [key: string]: any
  }
  value: any
  service?: any[]
  pages?: any[]
  views?: any[]
  components?: {
    [key: string]: any
  }
}

const modules = {
  get list(): Item[] {
    return window.__modules__ || []
  },
  set(list: Item[]) {
    window.__modules__ = list
  },
  get(name: string) {
    return name
      ? window.__modules__.find(e => e.name === name)
      : window.__modules__
  },
}

export default modules
