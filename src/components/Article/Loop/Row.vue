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
  tag: {
    type: String,
    default: "h3",
  },
  row: {
    type: Number,
    default: 4,
  },
  gap: {
    type: Number,
    default: 2,
  },
});
</script>

<template>
  <div class="grid md:grid-cols-2 gap-5 2xl:grid-cols-4 xl:grid-cols-3">
    <nuxt-link
      v-for="article in list"
      :key="article.id"
      :to="`/news/${article.categorySlug}/${article.slug}`"
      class="relative"
    >
      <div class="relative h-0 mb-2 overflow-hidden rounded thumbnail">
        <img
          :src="article.thumbnail"
          class="absolute top-0 left-0 object-cover w-full h-full"
        />
      </div>
      <div class="px-2">
        <component :is="tag" class="text-base font-bold ellipsis">
          {{ article.title }}
        </component>

        <div
          class="flex flex-wrap justify-between w-full py-2 mt-auto text-xs text-gray-600 dark:text-gray-400"
        >
          <div class="flex justify-between w-full mb-1" itemprop="author">
            <p>{{ article.author }}</p>
            <p>{{ article.categories }}</p>
          </div>
          <div class="flex w-full">
            <div class="mr-2 tracking-wider" itemprop="create-date">
              {{ article.publishTime?.split(" ")?.shift() }}
            </div>

            <div class="flex ml-auto items-center space-x-4">
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
    </nuxt-link>
  </div>

  <ArticleLoopRowLoading v-if="infinite && loading" class="mt-2" />
</template>

<style lang="scss" scoped>
.thumbnail {
  padding-top: calc(100% * 7 / 12);
}
</style>
