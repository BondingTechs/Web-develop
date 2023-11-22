<script lang="ts" setup>
import { useBaseStore } from "@/stores";
import { storeToRefs } from "pinia";

const emit = defineEmits(["submit"]);

const { user } = useBaseStore();
const { isLogin, info } = storeToRefs(user);
const $showAuth = useState("showAuth");
const message = ref("");
const comment = ref(null);

const submit = () => {
  emit("submit", message.value);
  message.value = "";
};
</script>

<template>
  <div class="pb-5">
    <div v-if="isLogin">
      <div class="flex">
        <div class="mr-4">
          <div class="rounded-full overflow-hidden w-12 h-12">
            <img src="/user.png" class="object-cover w-full h-full" />
          </div>
        </div>
        <div class="flex-1">
          <div class="text-xs mb-2">ID: {{ info?.username }}</div>
          <UIFormEditor
            ref="comment"
            v-model="message"
            placeholder="發表留言..."
            class="mb-3"
          />
          <div
            class="cursor-pointer inline-block text-sm text-center bg-green-400 dark:bg-green-400 w-fit px-3 rounded h-8 leading-8 text-white"
            @click="submit"
          >
            送出
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isLogin">
      <div class="flex" @click="$showAuth = true">
        <div class="mr-4">
          <div class="rounded-full overflow-hidden w-12 h-12">
            <img src="/user.png" class="object-cover w-full h-full" />
          </div>
        </div>
        <div class="flex-1">
          <div
            class="w-full h-14 rounded py-2 px-4 text-sm mb-4 cursor-pointer bg-transparent dark:focus:bg-gray-300/[0.1] duration-200 border border-gray-300 dark:border-gray-300/[0.2]"
          >
            <span class="opacity-70"> 請先登入會員...</span>
          </div>
          <div
            class="text-sm cursor-pointer inline-block text-center bg-green-500 px-3 rounded h-8 leading-8 text-white"
          >
            登入
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
