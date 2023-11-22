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
const { data: videoNews }: any = await useHttpPost(
  `category-video-news-${categorySlug}`,
  "/news/list",
  { async: true, body: { category: categorySlug, type: "video", size: 8 } }
);

const loading = ref(false);
const loadNews = async () => {
  loading.value = true;
  const page = videoNews.value.pagination.page;
  const size = videoNews.value.pagination.size;
  const { data }: any = await $fetch("/api/news/page", {
    method: "POST",
    body: { category: categorySlug, type: "normal", size, page: page + 1 },
  });
  const list = data?.list ?? [];

  setTimeout(() => {
    if (list.length) {
      videoNews.value.list.push(...list);
      videoNews.value.pagination =
        data.pagination ?? videoNews.value.pagination;
    }
    loading.value = false;
  }, 300);
};
</script>

<template>
  <LayoutWrapper>
    <!-- 分類名稱、排序篩選 -->
    <!-- 影片/圖片 -->
    <LayoutHeader
      class="z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700 lg:-mx-0 lg:px-0 -mx-4 px-4"
    >
      <UITitle tag="h1" :title="category?.name" class="capitalize">
        <ArticleFilter />
      </UITitle>
    </LayoutHeader>

    <LayoutBody>
      <!-- 新聞列表 -->
      <LayoutSection>
        <ArticleLoopRow
          tag="h3"
          :list="videoNews.list ?? []"
          :infinite="true"
          :loading="loading"
          @load="loadNews"
        />
        <div
          v-if="
            videoNews.pagination.total >
            videoNews.pagination.size * videoNews.pagination.page
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
