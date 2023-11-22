<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBaseStore } from '@/stores'

const props = defineProps(['comment', 'articleId'])

// 留言按讚
const $message = useState('message')
const $auth = useState('auth')
const { user } = useBaseStore()
const { isLogin } = storeToRefs(user)

const like = async (comment: any) => {
  if (!isLogin.value)
    return ($auth.value = true)
  const {
    data: isSave,
    error,
    message,
  } = await useHttpFetchPost('/comment/like', { body: { commentId: comment.id, articleId: props.articleId } })
  if (error)
    return ($message.value = message)
  comment.isLike = isSave
  comment.likes = +comment.likes + (isSave ? 1 : -1)
}
</script>

<template>
  <div
    class="flex py-3 mb-1 border-b last:border-b-0 last:pb-0 last:mb-0 last-border-0 border-gray-200 dark:border-gray-700"
  >
    <div class="rounded-full mr-4 overflow-hidden w-10 h-10">
      <img src="/user.png" class="object-cover w-full h-full">
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
        <div
          class="cursor-pointer flex items-center space-x-1"
          @click="like(comment)"
        >
          <UnoIcon
            v-if="!comment.isLike"
            class="i-ic-outline-thumb-up w-4"
          />
          <UnoIcon
            v-if="comment.isLike"
            class="text-blue-600 w-4 i-ic-round-thumb-up"
          />
          <span class="min-w-3 text-left">{{ comment.likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
