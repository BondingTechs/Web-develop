<script lang="ts" setup>
import { useBaseStore } from "~/stores";

definePageMeta({
  auth: true,
});

const route = useRoute();
const { user } = useBaseStore();

const items = ref([
  { id: 1, icon: "i-uil-user", label: "個人資料", path: "/my/account" },
  { id: 2, icon: "i-uil-file-alt", label: "瀏覽紀錄", path: "/my/history" },
  {
    id: 3,
    icon: "i-ion-heart-outline",
    label: "我的收藏",
    path: "/my/collections",
  },
  { id: 4, icon: "i-uil-lightbulb-alt", label: "小知識", path: "/my/tips" },
  {
    id: 5,
    icon: "i-uil-sign-out-alt",
    label: "登出",
    action: () => {
      user.logout();
    },
  },
]);

const activeId = ref(1);

watch(route, (val) => {
  const item = items.value.find((item: any) => item.path === val.fullPath);
  activeId.value = item?.id || 1;
});

onMounted(() => {
  const item = items.value.find((item: any) => item.path === route.fullPath);
  activeId.value = item?.id || 1;
});
</script>

<template>
  <div class="cma mb-0 md:flex flex-wrap lg:px-8 lg:py-5 my">
    <div class="lt-lg:hidden w-48 mr-10">
      <div
        class="items rounded border border-gray-200 dark:border-gray-300 dark:border-opacity-30"
      >
        <template v-for="(item, index) in items">
          <NuxtLink
            v-if="item.path"
            :key="item.id"
            :to="item.path"
            class="flex items-center cursor-pointer text-sm font-bold py-3 px-3 hover:bg-gray-200 dark:bg-opacity-10 border-b dark:border-opacity-30 border-gray-200 last-border-0 duration-200"
          >
            <UnoIcon class="mr-3" :class="item.icon" />
            <span>{{ item.label }}</span>
          </NuxtLink>
          <div
            v-else
            :key="index"
            class="flex items-center cursor-pointer text-sm font-bold py-3 px-3 hover:bg-gray-200 dark:bg-opacity-10 border-b dark:border-opacity-30 border-gray-200 last-border-0 duration-200"
            @click="item.action"
          >
            <UnoIcon class="mr-3" :class="item.icon" />
            <span>{{ item.label }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="flex-1 relative">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.items a.router-link-active {
  @apply bg-gray-200 dark:bg-opacity-10;
}
</style>
