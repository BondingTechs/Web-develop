<script lang="ts" setup>
import { TransitionChild, TransitionRoot } from "@headlessui/vue";

defineProps({
  list: {
    type: Array<any>,
    default: () => [],
  },
});

const $bodyLock = useState("body.lock");
const dialogInfo: any = ref({});
const dialogShow = ref(false);
const dialogLoading = ref(false);
const openDialog = async (id: number) => {
  $bodyLock.value = true;
  dialogShow.value = true;
  dialogLoading.value = true;
  const { data } = await useHttpFetchPost("/tip/info", { body: { id } });
  dialogInfo.value = data;
  dialogLoading.value = false;
};

const closeDialog = () => {
  dialogShow.value = false;
  $bodyLock.value = false;
  setTimeout(() => {
    dialogInfo.value = {};
  }, 150);
};

const collection = async (id: number) => {
  const { data, error } = await useHttpFetchPost("/tip/collection", {
    body: { id },
  });
  if (!error) dialogInfo.value.isCollection = data.status;
};
</script>

<template>
  <div class="grid md:grid-cols-2 gap-5 2xl:grid-cols-4 xl:grid-cols-3">
    <div
      v-for="item in list"
      :key="item.id"
      class="relative cursor-pointer"
      @click="openDialog(item.id)"
    >
      <div
        class="relative mb-2 overflow-hidden rounded thumbnail"
        :class="{ 'bg-gray-300 dark:bg-gray-700': !item.thumbnail }"
        :style="'aspect-ratio: 14/9'"
      >
        <img
          :src="item.thumbnail"
          v-if="!!item.thumbnail"
          class="absolute top-0 left-0 object-cover w-full h-full"
        />
      </div>

      <div class="px-2">
        <h3 class="text-base font-bold ellipsis">
          {{ item.title }}
        </h3>

        <div
          class="flex flex-wrap justify-between w-full py-2 mt-auto text-xs text-gray-600 dark:text-gray-400"
        >
          <div class="flex justify-between w-full mb-1">
            <p>{{ item.categories }}</p>
          </div>
          <div class="flex w-full">
            <div class="mr-2 tracking-wider">
              {{ item.publishDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <TransitionRoot :show="dialogShow" appear>
      <TransitionChild
        as="template"
        enter="duration-150 linear"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-150 linear"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed top-0 left-0 w-full h-full z-20">
          <div
            class="absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50"
            @click="closeDialog"
          >
            <template v-if="dialogLoading">
              <UnoIcon
                class="i-eos-icons-loading absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
              />
            </template>
          </div>

          <div
            v-if="!dialogLoading"
            class="px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"
          >
            <div
              v-if="dialogInfo.title"
              class="bg-light-100 dark:bg-gray-800 sticky top-0 pt-7 pb-2 flex flex-wrap justify-between relative text-lg pl-[0.1em] tracking-widest font-bold"
            >
              {{ dialogInfo.title }}
              <div class="flex items-center space-x-3">
                <div
                  class="cursor-pointer flex items-center"
                  @click="collection(dialogInfo.id)"
                >
                  <UnoIcon
                    v-show="!dialogInfo.isCollection"
                    class="i-ion-heart-outline w-6"
                  />
                  <UnoIcon
                    v-show="dialogInfo.isCollection"
                    class="i-ion-heart text-red-600 w-6"
                  />
                </div>
                <UnoIcon
                  class="i-ion-ios-close-circle-outline text-2xl w-6 cursor-pointer"
                  @click="closeDialog"
                />
              </div>
            </div>
            <div class="text-sm opacity-60 pb-2">
              {{ dialogInfo.publishDate }}
            </div>
            <img :src="dialogInfo.thumbnail" />
            <div
              v-if="dialogInfo.content"
              class="py-2"
              v-html="dialogInfo.content"
            />
          </div>
        </div>
      </TransitionChild>
    </TransitionRoot>
  </Teleport>
</template>
