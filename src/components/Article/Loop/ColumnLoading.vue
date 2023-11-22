<script setup>
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  infinite: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'h3',
  },
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
  <div
    v-for="n in 2"
    :key="n"
    class="flex pt-3 mt-3 border-gray-200 dark:border-gray-700 border-t-1"
  >
    <div class="relative flex flex-wrap w-full">
      <div
        class="w-20 h-20 mr-4 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading"
      />
      <div class="flex flex-col content-between flex-1">
        <div
          class="w-full h-8 mb-2 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading"
        />
        <div>
          <div
            class="w-40 h-4 mb-2 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading"
          />
          <div class="flex justify-between">
            <div
              class="w-20 h-4 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading"
            />
            <div
              class="w-20 h-4 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading"
            />
          </div>
        </div>
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
