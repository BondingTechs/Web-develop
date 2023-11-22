import { defineStore } from 'pinia'

export const useDictStore = defineStore('dict', {
  state: (): any => ({
    data: null,
  }),
  actions: {
    async get() {
      if (this.data)
        return this.data
      const { data: dictData } = await useHttpFetchPost('/dict/data')
      this.data = dictData
    },
    reset() {
      this.data = []
    },
  },
})
