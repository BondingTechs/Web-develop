<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "xl",
  },
  color: {
    type: String,
    default: "",
  },
  darkColor: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "h2",
  },
  previous: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex flex-wrap items-center justify-between py-3">
    <div class="flex items-center flex-1 space-x-1 lg:space-x-2">
      <div
        v-if="previous"
        class="flex items-center cursor-pointer"
        @click="$router.go(-1)"
      >
        <UnoIcon class="i-uil-angle-left text-xl" />
      </div>
      <component
        :is="tag"
        :class="`
          lg:text-${size}
          text-
          ${color ? `text-${color}` : ''}
          ${darkColor ? `dark:text-${darkColor}` : ''}
        `"
        class="flex-1 font-bold ellipsis ellipsis-1"
      >
        {{ title }}
      </component>
    </div>
    <slot />
  </div>
</template>
