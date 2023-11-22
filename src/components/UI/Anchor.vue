<script lang="ts" setup>
// micro compiler
defineProps({
  text: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <NuxtLink
    v-if="to"
    tag="a"
    :to="to"
    class="transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
  <a
    v-else
    class="transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline"
    :href="href"
  >
    <slot>{{ text }}</slot>
  </a>
</template>
