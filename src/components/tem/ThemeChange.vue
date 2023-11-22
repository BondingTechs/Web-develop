<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
const colorMode = useColorMode();
const availableColor = ref([
  {
    id: 1,
    name: "dark",
    text: "深色模式",
    icon: "i-ph-moon-stars-duotone",
  },
  {
    id: 2,
    name: "light",
    text: "淺色模式",
    icon: "i-ph-sun-dim-duotone",
  },
  // {
  //   id: 3,
  //   name: 'sepia',
  //   text: '護眼模式',
  //   icon: 'i-ph-coffee',
  // },
  {
    id: 4,
    name: "system",
    text: "根據系統設定",
    icon: "i-ph-laptop-duotone",
  },
]);
</script>

<template>
  <div class="relative flex items-center">
    <Listbox
      v-model="$colorMode.preference"
      as="div"
      class="relative flex items-center"
    >
      <ListboxLabel class="sr-only"> Theme </ListboxLabel>
      <ListboxButton type="button" title="Change Color">
        <div class="flex w-7 h-7 items-center justify-center">
          <UnoIcon class="i-ph-palette-duotone text-lg dark:text-white" />
        </div>
      </ListboxButton>
      <ListboxOptions
        class="absolute mt-3 ring-1 ring-black ring-opacity-5 top-full right-0 z-20 mt-2 w-40 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0"
      >
        <ListboxOption
          v-for="color in availableColor"
          :key="color.id"
          :value="color.name"
          class="flex w-full cursor-pointer items-center justify-between py-2 px-3"
        >
          <span class="truncate">
            {{ color.text }}
          </span>
          <span class="flex items-center justify-center text-sm">
            <UnoIcon :class="color.icon" class="text-base" />
          </span>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>
