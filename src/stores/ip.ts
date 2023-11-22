import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'

const API_KEY = 'f230d79e6b4e40379f05e24682765349'
const IP_GEO_URL = 'https://api.ipgeolocation.io/ipgeo'
const IP_AGENT_URL = 'https://api.ipgeolocation.io/user-agent'

export const useIPStore = defineStore('ip', () => {
  const info: any = ref(null)
  const agent = ref<any>(null)
  const user = useUserStore()
  const geoInfo = ref<any>(null)

  watch(() => user.isLogin, async (val: any) => {
    if (val) {
      clear()
      get()
    }
  })

  // 獲取用戶信息
  async function get() {
    try {
      if (info.value && agent.value) {
        return {
          info: info.value,
          agent: agent.value
        }
      }
      const { data: geoData } = await axios.get(`${IP_GEO_URL}?apiKey=${API_KEY}`)
      geoInfo.value = geoData

      // 新增ip info，並取得infoId
      const { data: { id: infoId } } = await useHttpFetchPost('/ip/info', {
        body: {
          ip: geoData.ip,
          country: geoData.country_name,
          city: geoData.city,
          district: geoData.district,
          latitude: geoData.latitude,
          longitude: geoData.longitude,
          timezone: geoData.time_zone.name
        }
      })
      info.value = { ...geoData, infoId }

      // 新增ip agent
      const { data: agentData } = await axios.get(`${IP_AGENT_URL}?apiKey=${API_KEY}`)
      const { data: { id: agentId } } = await useHttpFetchPost('/ip/agent', {
        body: {
          infoId,
          userAgentString: agentData.userAgentString,
          name: agentData.name,
          type: agentData.type,
          version: agentData.version,
          versionMajor: agentData.versionMajor,
          device: JSON.stringify(agentData.device),
          engine: JSON.stringify(agentData.engine),
          operatingSystem: JSON.stringify(agentData.operatingSystem),
        }
      })
      agent.value = { id: agentId, ...agentData, infoId }

      return {
        info: info.value,
        agent: agent.value
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  // 清除用戶
  function clear() {
    info.value = null
  }

  return {
    info,
    get,
    clear,
  }
})
