<script lang="ts" setup>
import { useBaseStore } from "@/stores";
import { storeToRefs } from "pinia";

const props = defineProps({
  comment: {
    type: Object,
    default: () => {},
  },
  articleId: {
    type: Number,
    default: null,
  },
});

defineEmits(["like"]);

// 主變數
const children: any = ref([]);
const pagination: any = ref({});

// 留言展開
const commentListOpen = ref(false);

const expand = async (parentId: number) => {
  commentListOpen.value = true;
  const { data }: any = await useHttpFetchPost("/comment/page", {
    body: { parentId },
  });
  if (data?.list.length && !children.value.length) {
    children.value.push(...data.list);
    pagination.value = data.pagination;
  }
};

// 留言按讚
const $message = useState("message");
const $showAuth = useState("showAuth");

const { user } = useBaseStore();
const { isLogin } = storeToRefs(user);

const like = async (comment: any) => {
  if (!isLogin.value) return ($showAuth.value = true);
  const {
    data: isSave,
    error,
    message,
  } = await useHttpFetchPost("/comment/like", {
    body: { commentId: comment.id, articleId: props.articleId },
  });
  if (error) return ($message.value = message);
  comment.isLike = isSave;
  comment.likes = +comment.likes + (isSave ? 1 : -1);
};

const createComment = async (content: any) => {
  const { error, message, data } = await useHttpFetchPost("/comment/create", {
    body: {
      content,
      articleId: props.articleId,
      parentId: props.comment.id,
    },
  });
  if (error) return ($message.value = message);

  children.value.unshift(data);
};

const submit = (e: any) => {
  const stringLength = e.replace(/<\/?[^>]+(>|$)/g, "");
  if (!stringLength) createComment("");
  else createComment(e);
};
</script>

<template>
  <div
    class="py-3 mb-1 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0 last:mb-0"
  >
    <div class="flex w-full">
      <div class="rounded-full mr-4 overflow-hidden w-12 h-12">
        <img src="/user.png" class="object-cover w-full h-full" />
      </div>
      <div class="flex-1">
        <p class="text-sm">
          {{ comment.author }}
        </p>
        <p class="text-xs opacity-80 pb-2">
          {{ comment.createTime }}
        </p>
        <div class="pb-2" v-html="comment.content" />
        <div class="flex items-center space-x-4">
          <div class="cursor-pointer flex items-center" @click="like(comment)">
            <UnoIcon v-if="!comment.isLike" class="i-ic-outline-thumb-up w-4" />
            <UnoIcon
              v-if="comment.isLike"
              class="text-blue-600 w-4 i-ic-baseline-thumb-up"
            />
            <span class="min-w-3 text-left ml-1">{{ comment.likes }}</span>
          </div>

          <div
            class="flex items-center space-x-1 cursor-pointer"
            @click="commentListOpen = !commentListOpen"
          >
            <UnoIcon class="i-uil-comment-alt-dots w-4" />
            <span>{{ comment.comments }}</span>
          </div>
        </div>
        <template v-if="comment.hasChild">
          <div
            class="w-fit text-sm cursor-pointer pt-4 pb-2 text-gary-800 dark:text-gray-200"
          >
            <div
              v-if="!commentListOpen"
              class="flex items-center text-sm space-x-2"
              @click="expand(comment.id)"
            >
              <UnoIcon
                class="i-ion-md-arrow-dropdown w-4 mr-1 flex items-center"
              />
              展開
            </div>
            <div
              v-if="commentListOpen"
              class="flex items-center space-x-2"
              @click="commentListOpen = false"
            >
              <UnoIcon
                class="i-ion-md-arrow-dropup w-4 mr-1 flex items-center"
              />
              收起
            </div>
          </div>
          <div v-if="commentListOpen" class="w-full">
            <div
              class="py-3 mb-1 border-b last:border-b-0 last-border-0 border-gray-200 dark:border-gray-700"
            >
              <ArticleCommentChild
                v-for="child in children"
                :key="child.id"
                :comment="child"
                :article-id="articleId"
              />
            </div>
          </div>
        </template>
        <template v-if="commentListOpen">
          <ArticleCommentForm class="pt-4 -ml-8 md:ml-0" @submit="submit" />
        </template>
      </div>
    </div>
  </div>
</template>
