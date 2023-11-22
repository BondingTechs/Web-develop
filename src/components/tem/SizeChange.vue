<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { availableSizes } from '~/utils/init/size'

// micro compiler
const props = defineProps({
  type: {
    type: String,
    default: 'dropdown-right-top',
  },
})

// state
const currentStyle = toRef(props, 'type')
const sizeSetting = useState<string>('size.setting')
</script>

<template>
  <div class="flex items-center">
    <Listbox
      v-if="currentStyle === 'dropdown-right-top'"
      v-model="sizeSetting"
      as="div"
      class="relative flex items-center"
    >
      <ListboxLabel class="sr-only">
        Theme
      </ListboxLabel>
      <ListboxButton
        type="button"
        class="flex w-7 h-7 items-center justify-center"
        title="更改文字大小"
      >
        <span class="flex items-center justify-center">
          <UnoIcon class="i-octicon-text-size" />
        </span>
      </ListboxButton>
      <ListboxOptions
        class="absolute mt-3 ring-1 ring-black ring-opacity-5 top-full right-0 z-20 mt-2 w-40 overflow-hidden rounded-sm bg-white text-sm font-semibold text-gray-700 shadow-md shadow-gray-300/[0.2] outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500/[0.2] dark:ring-0"
      >
        <ListboxOption
          v-for="size in availableSizes"
          :key="size.iso"
          :value="size.iso"
          class="flex w-full cursor-pointer items-center justify-between py-2 px-3"
          :class="{
            'text-white-500 bg-gray-200 dark:bg-gray-500/50':
              sizeSetting === size.iso,
            'hover:bg-gray-200 dark:hover:bg-gray-700/30':
              sizeSetting !== size.iso,
          }"
        >
          <span
            class="flex-1 truncate flex w-full items-center justify-between"
          >
            <p>{{ size.name }}</p>
            <span class="text-xs">({{ size.iso }})</span>
          </span>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <select
      v-if="currentStyle === 'select-box'"
      v-model="sizeSetting"
      class="w-full px-2 pr-3 py-1 outline-none rounded border bg-transparent text-gray-700 dark:text-gray-300 border-gray-900/10 dark:border-gray-50/[0.2]"
    >
      <option
        v-for="size in availableSizes"
        :key="size.iso"
        :value="size.iso"
        class="flex items-center space-x-2"
      >
        {{ size.name }} ({{ size.iso }})
      </option>
    </select>
  </div>
</template>
