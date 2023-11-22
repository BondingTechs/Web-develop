<script lang="ts" setup>
definePageMeta({
  layout: 'blog',
})

const { data: topNews }: any = await useHttpPost('hot-articles', '/news/list', {
  body: { isTop: true },
})

const { data: hotNews }: any = await useHttpPost('top-articles', '/news/list', {
  body: { isHot: true },
})

const { data: videoNews }: any = await useHttpPost(
  'video-articles',
  '/news/list',
  { body: { type: 'video', size: 8 } },
)

// infinite page
const { data: newsPage }: any = await useHttpPost(
  'more-articles',
  '/news/page',
  { body: { type: 11, size: 8 } },
)

const loading = ref(false)
const loadNews = async () => {
  loading.value = true
  const page = newsPage.value?.pagination.page
  const size = newsPage.value?.pagination.size
  const { data }: any = await $fetch('/api/news/page', {
    method: 'POST',
    body: { type: 'normal', size, page: page + 1 },
  })
  const list = data?.list ?? []

  setTimeout(() => {
    if (list && list.length) {
      newsPage.value?.list.push(...list)
      newsPage.value.pagination = data?.pagination ?? newsPage.value?.pagination
    }
    loading.value = false
  }, 300)
}
</script>

<template>
  <LayoutWrapper>
    <LayoutBody class="pt-0">
      <LayoutSection>
        <div class="flex flex-wrap">
          <!-- Slider - 廣告 -->
          <div v-if="topNews && topNews.length" class="w-full mb-2 md:mb-5 2xl:mb-0 2xl:mr-4 2xl:w-2/3">
            <UITitle title="今日焦點" class="mb-2 capitalize" />
            <ArticleLoopSlider
              :list="topNews"
              :pagination="true"
              :navigation="true"
              :loop="true"
            />
          </div>
          <!-- 發燒文章 -->
          <div v-if="hotNews && hotNews.length" class="relative flex flex-col w-full 2xl:flex-1">
            <UITitle title="發燒新聞" class="mb-2 capitalize" />
            <div
              class="relative flex-1 bg-gray-100 rounded-md hot-list dark:bg-gray-800"
            >
              <div
                class="top-0 left-0 w-full h-full p-4 overflow-y-auto 2xl:absolute"
              >
                <ArticleLoopHot
                  :list="hotNews ?? []"
                  :pagination="true"
                  :page-size="1"
                />
              </div>
            </div>
          </div>
        </div>
      </LayoutSection>

      <!-- 影片新聞 x 8 -->
      <LayoutSection v-if="videoNews && videoNews.length">
        <UITitle tag="h2" title="影音新聞" class="mb-2 pt-0 capitalize" />
        <ArticleLoopRow tag="h3" :list="videoNews ?? []" :gap="3" />
        <nuxt-link
          to="/news/video"
          class="dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span class="pr-1 align-middle">看更多 </span>
          <UnoIcon class="i-uil-angle-double-right text-lg align-middle" />
        </nuxt-link>
      </LayoutSection>

      <!-- 新聞列表 -->
      <LayoutSection>
        <UITitle title="更多內容" :filter="[]" class="mb-2 pt-0">
          <ArticleFilter />
        </UITitle>
        <ArticleLoopRow
          tag="h3"
          :list="newsPage?.list ?? []"
          :infinite="true"
          :loading="loading"
          @load="loadNews"
        />

        <div
          v-if="
            newsPage?.pagination?.total
              > newsPage?.pagination?.size * newsPage?.pagination?.page
          "
          class="block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          :class="{ hidden: loading }"
          @click="loadNews()"
        >
          <p>載入更多</p>
        </div>
        <div
          v-else
          class="text-center pt-8 text-xs font-bold tracking-widest opacity-50"
        >
          無更多資料...
        </div>
      </LayoutSection>
    </LayoutBody>
  </LayoutWrapper>
</template>
