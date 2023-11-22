<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useBaseStore } from "~/stores";

// micro compiler
const props = defineProps({
  type: {
    type: String,
    default: "dropdown-right-top",
  },
});
const router = useRouter();

const { user } = useBaseStore();
const { info, isLogin } = storeToRefs(user);

const showAuth = useState<boolean>("showAuth", () => false);

const userMenu = ref([
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
    action: () => user.logout(),
  },
]);

const clickNav = (id: number) => {
  const item = userMenu.value.find((item) => item.id === id);
  if (item?.path) router.push(item.path);
  else if (item?.action) item.action();
};

// state
const currentStyle = toRef(props, "type");
const sizeSetting = useState<string>("size.setting");
</script>

<template>
  <div class="flex items-center relative">
    <Listbox
      v-if="currentStyle === 'dropdown-right-top'"
      v-model="sizeSetting"
      as="div"
      class="flex items-center"
    >
      <ListboxLabel class="sr-only"> 用戶 </ListboxLabel>
      <ListboxButton class="block" type="button" title="用戶中心">
        <div
          v-if="isLogin"
          class="flex items-center justify-center cursor-pointer"
        >
          <img class="w-6 h-6 rounded-full" src="/user.png" />
          <span class="ml-2 text-sm font-semibold">{{
            `${info?.firstName || ""}${info?.lastName || ""}`
          }}</span>
          <UnoIcon class="i-uil-angle-down" />
        </div>

        <div
          v-else
          class="flex items-center justify-center h-full cursor-pointer"
          @click="showAuth = true"
        >
          <UnoIcon class="i-ph-user-circle w-6 h-6" />
          <span class="ml-2 text-sm font-semibold">未登入</span>
          <UnoIcon class="i-uil-angle-down" />
        </div>
      </ListboxButton>
      <ListboxOptions
        v-if="isLogin"
        class="absolute ring-1 ring-black mt-3 ring-opacity-5 top-full right-0 z-[999] mt-2 w-32 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0"
      >
        <ListboxOption v-for="(menu, index) in userMenu" :key="index">
          <div
            class="flex items-center w-full cursor-pointer items-center py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700/30"
            @click="clickNav(menu.id)"
          >
            <UnoIcon :class="menu.icon" class="mr-3" />
            <span class="truncate">{{ menu.label }}</span>
          </div>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>
