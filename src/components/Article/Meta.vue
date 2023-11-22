<script lang="ts" setup>
const props = defineProps({
  author: {
    type: String,
    default: '',
  },
  publishTime: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="py-2 text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400">
    <div class="space-y-2 lg:space-y-0 lg:flex lg:flex-wrap lg:space-x-4">
      <div class="flex items-center space-x-2">
        <UnoIcon class="i-carbon-user-avatar" />
        <span>{{ author }}</span>
      </div>
      <!-- <div class="flex items-center space-x-2">
        <EosIconsModifiedDateOutlined />
        <span
          >參考資料 -
          <a target="_blank" href="https://reskin.dev/"
            >https://reskin.dev/</a
          ></span
        >
      </div> -->
      <div class="flex items-center space-x-2">
        <UnoIcon class="i-carbon-time" />
        <span>{{ publishTime }}</span>
      </div>
    </div>
  </div>
</template>
