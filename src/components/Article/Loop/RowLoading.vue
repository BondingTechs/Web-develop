<script setup>
defineProps({
  row: {
    type: Number,
    default: 4,
  },
  column: {
    type: Number,
    default: 2,
  },
  gap: {
    type: Number,
    default: 2,
  },
})
</script>

<template>
  <div class="grid md:grid-cols-2 gap-5 2xl:grid-cols-4 xl:grid-cols-3">
    <div
      v-for="n in 4"
      :key="n"
      :class="[{ 'xl:hidden 2xl:block': n > 3 }, { 'hidden lg:block': n > 2 }]"
      class="relative"
    >
      <div
        class="h-0 mb-2 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading thumbnail"
      />
      <div
        class="w-full h-12 mb-3 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading"
      />
      <div class="flex justify-between">
        <div
          class="w-16 h-5 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading"
        />
        <div
          class="w-16 h-5 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thumbnail {
  padding-top: calc(100% * 7 / 12);
}
</style>

<style lang="scss">
.loading {
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background-size: 2000px 640px;
  position: relative;
  opacity: 0.5;
}
.dark\:loading {
  display: none;
}
@keyframes placeHolderShimmer {
  0% {
    background-position: -900px 0;
  }
  100% {
    background-position: 900px 0;
  }
}
</style>
