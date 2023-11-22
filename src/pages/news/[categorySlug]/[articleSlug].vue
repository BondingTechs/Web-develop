<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBaseStore } from "~/stores";

definePageMeta({
  layout: "blog",
});

// 用戶登入狀態
const { user } = useBaseStore();
const { isLogin, token } = storeToRefs(user);

// 取得slug
const route = useRoute();
const { articleSlug } = route.params;

const { data: article, refresh: articleRefresh }: any = await useHttpPost(
  `article-info-${articleSlug}`,
  "/news/article",
  { body: { slug: articleSlug } }
);

watch(token, async () => {
  await articleRefresh();
});

onMounted(() => {
  const { isPreview } = article.value;
  if (token.value.length && isPreview) {
    setTimeout(async () => {
      await articleRefresh();
    }, 300);
  }
});

// if (article.value?.isPreview && token) await articleRefresh();

// 更多新聞
const { data: moreNews }: any = await useHttpPost(
  `article-more-${articleSlug}`,
  "/news/list",
  { body: { articleId: article.value?.id, size: 3 } }
);

// SEO meta
const removeHTMLTag = (html: string) => {
  if (!html) return;
  var plainText = html.replace(
    /<\/?[^>]+(>|$)|\s+|&(lt|gt|amp|quot|nbsp);/g,
    ""
  );
  return plainText.substring(0, 50);
};
useHead({
  title: `${article.value?.metaTitle || article.value?.title} - BondingTechs`,
  meta: [
    {
      name: "description",
      content:
        article.value.metaDescription || removeHTMLTag(article.value?.content),
    },
    {
      property: "og:title",
      content: `${
        article.value?.metaTitle || article.value?.title
      } - BondingTechs`,
    },
    {
      property: "og:description",
      content:
        article.value.metaDescription || removeHTMLTag(article.value?.content),
    },
    { property: "og:image", content: article.value.thumbnail },
    { property: "og:url", content: route.fullPath },
    { property: "og:type", content: "article" },
  ],
});

// 點讚
const $message = useState("message");
const $auth = useState("showAuth");
const likeArticle = async () => {
  if (isLogin.value) {
    const {
      data: { status = false },
      error,
      message,
    }: any = await useHttpFetchPost("/news/like", {
      body: { id: article.value?.id },
    });
    if (error) return ($message.value = message.value);

    article.value.isLike = status;
    article.value.likes = +article.value.likes + (status ? 1 : -1);
  } else {
    $auth.value = true;
  }
};

// 收藏
const collectionArticle = async () => {
  if (isLogin.value) {
    const {
      data: { status = false },
      error,
      message,
    }: any = await useHttpFetchPost("/news/collection", {
      body: { id: article.value?.id },
    });
    if (error.value) return ($message.value = message.value);

    article.value.isCollection = status;
    article.value.collections = +article.value.collections + (status ? 1 : -1);
  } else {
    $auth.value = true;
  }
};

// 留言
const { data: comments }: any = await useHttpPost(
  `article-comment-${articleSlug}`,
  "/comment/page",
  { body: { articleId: article.value?.id, page: 1, size: 10 } }
);
const createComment = async (content: any) => {
  const { error, message, data } = await useHttpFetchPost("/comment/create", {
    body: { content, articleId: article.value?.id },
  });
  if (error) return ($message.value = message);

  comments.value.list.unshift(data);
};

// 更多留言
const comment: any = ref(null);

const commentIsEnd = computed((): boolean => {
  const { page = 1, size = 1, total = 1 } = comments.value?.pagination;
  return page * size >= total;
});

const commentLoading = ref(false);
const moreComments = async () => {
  if (commentIsEnd.value || !comments.value?.list?.length) return;
  const page = comments.value?.pagination.page + 1;
  const size = comments.value?.pagination.size;
  commentLoading.value = true;
  const { data }: any = await useHttpFetchPost("/comment/page", {
    body: { articleId: article.value?.id, page, size },
  });
  commentLoading.value = false;
  comments.value.list.push(...data.list);
  comments.value.pagination = data.pagination;
};

const { offset } = useOffsetWatcher();
watch(offset, (val) => {
  if (commentLoading.value) return;
  const windowHeight = window.innerHeight;
  const offsetTop = comment.value?.offsetTop || 0;
  const offsetHeight = comment.value?.offsetHeight || 0;
  if (offsetTop + offsetHeight - val - windowHeight < -50) moreComments();
});
</script>

<template>
  <!-- <Title name="description" :content="metaTitle" />
  <Meta name="description" :content="metaDescription" /> -->
  <LayoutWrapper>
    <LayoutHeader
      class="sticky z-10 bg-white border-b border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700 lg:-mx-0 lg:px-0 -mx-4 px-4"
    >
      <!-- 上一頁、文章名稱、更多(收藏、分享) -->
      <UITitle
        :title="article?.title"
        size="sm"
        color="gray-500"
        dark-color="gray-400"
        :previous="true"
        class="capitalize"
      >
        <div class="fb space-x-4 text-gray-500 dark:text-gray-400 lg:space-x-4">
          <div class="ml-auto fic space-x-2 md:space-x-5">
            <div class="cursor-pointer fic" @click="collectionArticle">
              <UnoIcon
                v-show="!article?.isCollection"
                class="i-ion-heart-outline w-6 lt-md:text-sm"
              />
              <UnoIcon
                v-show="article?.isCollection"
                class="i-ion-heart-sharp text-red-600 w-6 lt-md:text-sm"
              />
              <span class="ml-1">{{ +article?.collections }}</span>
            </div>

            <div class="cursor-pointer fic" @click="likeArticle">
              <UnoIcon
                v-show="!article?.isLike"
                class="i-ic-outline-thumb-up w-6 lt-md:text-sm"
              />
              <UnoIcon
                v-show="article?.isLike"
                class="i-ic-baseline-thumb-up w-6 text-blue-600 lt-md:text-sm"
              />
              <span class="ml-1">{{ +article?.likes }}</span>
            </div>

            <div class="fic space-x-1">
              <UnoIcon class="i-ion-eye-sharp w-6 lt-md:text-sm" />
              <span>{{ +article?.views }}</span>
            </div>
          </div>
        </div>
      </UITitle>
    </LayoutHeader>
    <LayoutBody>
      <LayoutSection>
        <h1 class="mb-1 md:mb-3 text-lg md:text-2xl font-bold">
          {{ article?.title }}
        </h1>
        <ArticleMeta
          :author="article?.authorName"
          :publish-time="article?.publishTime"
          class="mb-3 md:mb-5"
        />
        <div class="pb-6">
          <ArticleContentSingle
            v-if="article?.type === 11"
            :content="article.content || '無內容'"
          />
          <ArticleContentVideo
            v-else-if="article?.type === 12"
            :content="article?.content"
          />
        </div>
      </LayoutSection>

      <!-- 作者簡介 -->
      <LayoutSection>
        <div
          class="px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-t-1 border-b-1 border-gray-900/10 dark:border-gray-50/[0.2]"
        >
          <UITitle class="mb-2" title="撰寫人" />
          <ArticleAuthor
            :author-name="article?.authorName"
            :author-intro="article?.authorIntro"
            :author-avatar="article?.authorAvatar"
          />
        </div>
      </LayoutSection>

      <!-- 相關文章 -->
      <!-- border-b-1 -->
      <LayoutSection>
        <div
          class="px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-gray-900/10 dark:border-gray-50/[0.2]"
        >
          <UITitle title="相關文章" class="pb-5 mb-2" />
          <ArticleLoopColumn tag="h3" :list="moreNews ?? []" />
        </div>
      </LayoutSection>

      <!-- 留言區 -->
      <div ref="comment">
        <LayoutSection>
          <UITitle title="留言區" class="pb-5 mb-2" />
          <ArticleComment
            :comment-list="comments?.list ?? []"
            :article-id="article?.id ?? 0"
            @submit="createComment"
          />
        </LayoutSection>
      </div>
    </LayoutBody>
  </LayoutWrapper>
</template>
