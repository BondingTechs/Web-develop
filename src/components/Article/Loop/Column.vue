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
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="block">
    <nuxt-link
      v-for="article in list"
      :key="article.id"
      :to="`/news/${article.categorySlug}/${article.slug}`"
      class="flex pb-3 mb-3 border-gray-200 dark:border-gray-700 border-b-1 last-border-b-0 last-mb-0 last-pb-0"
    >
      <div class="flex flex-wrap w-full">
        <div class="relative w-20 h-20 mr-4">
          <img
            :src="article.thumbnail"
            class="absolute object-cover w-full h-full"
          />
        </div>
        <div class="flex flex-col content-between flex-1">
          <h3 class="text-base font-bold ellipsis">
            {{ article.title }}
          </h3>
          <div
            class="flex flex-wrap justify-between w-full pt-1 pb-2 mt-auto text-xs text-gray-600 dark:text-gray-400"
          >
            <div
              class="flex w-full mb-1 space-x-4 text-gray-700 dark:text-gray-300"
              itemprop="author"
            >
              <p>{{ article.authorName }}</p>
              <p>{{ article.categories }}</p>
            </div>
            <div class="flex">
              <span class="tracking-wider" itemprop="create-date">{{
                article.publishTime?.split(" ")?.shift()
              }}</span>
            </div>
            <div class="flex">
              <div class="flex items-center mr-3 space-x-2">
                <UnoIcon class="i-ic-baseline-thumb-up text-green-400" />
                <span>{{ article.likes }}</span>
              </div>

              <div class="flex items-center mr-3 space-x-2">
                <UnoIcon class="i-ion-eye-sharp text-green-400" />
                <span>{{ article.views }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>

    <ArticleLoopRowLoading v-if="infinite && loading" class="mt-2" />
  </div>
</template>
