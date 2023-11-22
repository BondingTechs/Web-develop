<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  infinite: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="grid py-1 grid-rows-2 lg:gap-4 lg:grid-cols-2 2xl:block">
    <nuxt-link
      v-for="(article, index) in list"
      :key="article.id"
      :to="`/news/${article.categorySlug}/${article.slug}`"
      class="flex border-gray-200 dark:border-gray-700 2xl:mb-4 lt-lg:px-1 last:mb-0 last:border-0 last:pb-0"
      :class="
        list.length - 2 <= index
          ? '2xl:pb-4 2xl:border-b-1 lt-lg:mb-3 lt-lg:pb-3 lt-lg:border-b-1 last-pb-0 last-mb-0 last-border-b-0'
          : 'border-b-1 pb-4 lg:pb-3 2xl:pb-4 lt-lg:mb-4'
      "
    >
      <div class="flex flex-wrap w-full">
        <div class="relative w-20 h-18 mr-4">
          <img
            :src="article.thumbnail"
            class="absolute object-cover w-full h-full rounded-sm"
          >
        </div>
        <div class="flex flex-col content-between flex-1">
          <h3 class="text-base font-bold ellipsis">
            {{ article.title }}
          </h3>

          <div
            class="flex flex-wrap justify-between w-full pt-1 mt-auto text-xs text-gray-600 dark:text-gray-400"
          >
            <div class="flex justify-between w-full mb-1" itemprop="author">
              <p>{{ article.authorName }}</p>
              <p>{{ article.categories }}</p>
            </div>
            <div class="flex flex-wrap w-full">
              <div class="mr-2 tracking-wider" itemprop="create-date">
                {{ article.publishTime?.split(' ')?.shift() }}
              </div>
              <div class="ml-auto flex items-center space-x-4">
                <div class="flex items-center justify-end ml-auto space-x-1">
                  <UnoIcon class="i-ic-baseline-thumb-up text-green-400" />
                  <span>{{ article.likes }}</span>
                </div>

                <div class="flex items-center ml-auto space-x-1">
                  <UnoIcon class="i-ion-eye-sharp text-green-400" />
                  <span>{{ article.views }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
