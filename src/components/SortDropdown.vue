<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

defineProps({
  options: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select'])

// methods
const select = (item) => {
  emit('select', item)
}
</script>

<template>
  <div class="flex items-center">
    <Menu as="div" class="relative inline-block text-left z-10">
      <div>
        <MenuButton
          class="flex items-center space-x-2 text-sm font-medium rounded-md focus:outline-none bg-opacity-20 hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <UnoIcon class="i-ic-baseline-sort" />
          <span>排序依據</span>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 py-2 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-800 w-fit focus:outline-none ring-1 ring-black ring-opacity-5"
        >
          <MenuItem
            v-for="(item, index) in options"
            :key="index"
            v-slot="{ active }"
            @click="select(item)"
          >
            <button
              class="group flex items-center px-4 w-full py-2 text-sm whitespace-nowrap"
              :class="[{ 'bg-light-500 dark:bg-gray-800': active }]"
              v-text="item.text"
            />
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
