<script setup>
defineProps({
  commentList: {
    type: Array,
    default: () => [],
  },
  articleId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["submit"]);

const submit = (e) => {
  const stringLength = e.replace(/<\/?[^>]+(>|$)/g, "");
  if (!stringLength) emit("submit", "");
  else emit("submit", e);
};
</script>

<template>
  <div class="comment-container">
    <ArticleCommentForm @submit="submit" />
    <ArticleCommentItem
      v-for="(comment, index) in commentList"
      :key="index"
      :article-id="articleId"
      :comment="comment"
      @submit="submit"
    />
  </div>
</template>
