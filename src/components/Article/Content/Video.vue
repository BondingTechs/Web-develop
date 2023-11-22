<script lang="ts" setup>
import { useBaseStore } from "@/stores";
import { storeToRefs } from "pinia";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});

const { user } = useBaseStore();
const { isLogin } = storeToRefs(user);
const $auth = useState("showAuth");
</script>

<template>
  <client-only>
    <ArticleVideo v-if="isLogin" />
    <div class="article-content" v-html="props.content" />

    <div
      v-if="!isLogin"
      class="group read-more relative pt-20 pb-4 -mt-14 lg:-mx-8"
    >
      <div
        class="flex items-center justify-center opacity-50 group-hover:opacity-80 duration-150 cursor-pointer text-sm"
        @click="$auth = true"
      >
        <span class="mr-2">登入後觀看影音新聞</span>
        <UnoIcon class="i-ant-design-login-outlined" />
      </div>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
.read-more {
  background: linear-gradient(180deg, transparent, white 40%);
}
.dark .read-more {
  background: linear-gradient(180deg, transparent, rgba(17, 24, 39, 80) 40%);
}
</style>
