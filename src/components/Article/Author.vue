<script lang="ts" setup>
import { htmlTag } from '~~/src/utils/regex';

const props = defineProps(['authorName', 'authorIntro', 'authorAvatar'])
</script>

<template>
  <div class="flex flex-wrap">
    <div
      class="flex flex-wrap items-center w-full pb-4 border-gray-900/10 dark:border-gray-50/[0.2] lg:w-auto lg:pb-0 lg:pr-16 lg:mr-16 lg:border-b-0 lg:border-r-1"
    >
      <div
        class="mr-6 overflow-hidden rounded-full shadow-sm shadow w-16 h-16 shadow-blue-200"
      >
        <img
          :src="'/user.png'"
          class="object-cover w-full h-full"
        >
      </div>
      <div class="font-bold">
        <p class="pb-1 text-lg">
          {{ props.authorName }}
        </p>
        <p class="text-sm tracking-widest dark:text-gray-400">
          專欄編輯
        </p>
      </div>
    </div>
    <div
      v-if="props.authorIntro?.replaceAll(htmlTag, '')"
      class="flex-1 py-3 space-y-3 text-sm text-gray-800 lg:pr-4 dark:text-gray-300"
      v-html="props.authorIntro"
    />
    <div
      v-else
      class="flex-1 py-3 space-y-3 text-sm text-gray-800 lg:pr-4 dark:text-gray-300"
      v-text="'尚未輸入自我介紹'"
    />
  </div>
</template>
