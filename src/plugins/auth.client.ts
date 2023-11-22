import { storeToRefs } from "pinia";
import { useBaseStore } from "../stores";
import { useIPStore } from "../stores/ip";


export default defineNuxtPlugin(() => {
  addRouteMiddleware(async (to, from) => {
    // auth
    if (from.fullPath !== to.fullPath && to.meta.auth) {
      const { user } = useBaseStore();
      const { isLogin } = storeToRefs(user);
      const $showAuth = useState("showAuth");

      if (!isLogin.value) {
        $showAuth.value = true;
        return abortNavigation()
      }
    }

    // ip
    const ipStore = useIPStore()
    const { agent }: any = await ipStore.get()
    useHttpFetchPost('/ip/history', { body: { agentId: agent.id, routeFrom: from.fullPath, routeTo: to.fullPath } })
    return true
  })
})