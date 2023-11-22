<script lang="ts" setup>
definePageMeta({
  layout: "blog",
});

const route = useRoute();
const { categorySlug } = route.params;

// 分類
const category: any = ref(null);
const { data: categoryData }: any = await useHttpPost(
  `category-slug-${categorySlug}`,
  "/category/info",
  { async: true, body: { slug: categorySlug } }
);

category.value = categoryData.value.data;

// 影片
const videoNews = ref([]);
const { data: videoNewsData }: any = await useHttpPost(
  `category-video-news-${categorySlug}`,
  "/news/list",
  { async: true, body: { category: categorySlug, type: 12, size: 8 } }
);

videoNews.value = videoNewsData.value?.data;

// infinite page
const newsPage: any = ref();
const { data: newsPageData }: any = await useHttpPost(
  `category-normal-news-${categorySlug}`,
  "/news/page",
  { async: true, body: { category: categorySlug, type: 11, size: 8 } }
);

newsPage.value = newsPageData.value.data;

const loading = ref(false);
const loadNews = async () => {
  loading.value = true;
  const page = newsPage.value.pagination.page;
  const size = newsPage.value.pagination.size;
  const { data }: any = await $fetch("/api/news/page", {
    method: "POST",
    body: { category: categorySlug, type: 11, size, page: page + 1 },
  });
  const list = data?.list ?? [];

  setTimeout(() => {
    if (list && list.length) {
      newsPage.value.list.push(...list);
      newsPage.value.pagination = data.pagination ?? newsPage.value.pagination;
    }
    loading.value = false;
  }, 300);
};
</script>

<template>
  <div>
    <LayoutWrapper>
      <!-- 分類名稱、排序篩選 -->
      <!-- 影片/圖片 -->
      <LayoutHeader
        class="z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700"
      >
        <UITitle tag="h1" :title="category?.name" class="capitalize">
          <ArticleFilter />
        </UITitle>
      </LayoutHeader>
      <!-- 影片新聞 x 8 -->
      <LayoutBody>
        <LayoutSection v-if="videoNews && videoNews.length">
          <UITitle tag="h2" title="影音新聞" class="mb-2 capitalize" />
          <ArticleLoopRow tag="h3" :list="videoNews" :gap="3" />
          <nuxt-link
            :to="`/news/video/${categorySlug}`"
            class="dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span class="pr-1 align-middle">看更多 </span>
            <UnoIcon class="i-uil-angle-double-right text-lg align-middle" />
          </nuxt-link>
        </LayoutSection>

        <!-- 篩選 - 按日期、按觀看人數 -->
        <!-- 新聞列表 -->
        <LayoutSection v-if="newsPage">
          <UITitle v-if="newsPage.length" title="更多新聞" class="mb-2" />
          <ArticleLoopRow
            tag="h3"
            :list="newsPage.list ?? []"
            :infinite="true"
            :loading="loading"
            @load="loadNews"
          />
          <div
            v-if="
              newsPage.pagination.total >
              newsPage.pagination.size * newsPage.pagination.page
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
  </div>
</template>
