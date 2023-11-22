<script lang="ts" setup>
definePageMeta({
  auth: true,
});

const list: any = ref([]);
const pagination: any = ref({});

const loading = ref(true);
const loaded = computed(
  () =>
    pagination.value?.total <=
      pagination.value?.size * pagination.value?.page ?? false
);

const getTips = async (page = 1, size = 10) => {
  loading.value = true;
  const { data } = await useHttpFetchPost("/my/tips", { body: { page, size } });
  list.value = data?.list;
  pagination.value = data?.pagination;
  loading.value = false;
};

onMounted(() => {
  getTips();
});

const loadMore = async () => {
  if (loaded.value || loading.value) return;
  loading.value = true;
  const page = pagination.value.page;
  const size = pagination.value.size;
  const { data } = await useHttpFetchPost("/my/history", {
    body: { size, page },
  });
  list.value.push(...data.list);
  pagination.value = data.pagination;
  loading.value = false;
};
</script>

<template>
  <div class="pb-4">
    <div class="flex items-center sticky mb-4">
      <div
        class="lg:hidden mr-2 flex items-center cursor-pointer"
        @click="$router.go(-1)"
      >
        <UnoIcon class="i-ic-round-arrow-back-ios text-sm lg:text-base" />
      </div>
      <h1 class="text-lg lg:text-xl font-bold">小知識列表</h1>
    </div>

    <div class="list">
      <TipRow :list="list" />

      <template v-if="!loading">
        <div
          v-show="!loaded"
          class="dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          @click="loadMore()"
        >
          <p>載入更多</p>
        </div>
        <div
          v-show="loaded"
          class="text-center pt-8 text-xs font-bold tracking-widest opacity-50"
        >
          無更多資料...
        </div>
      </template>
    </div>
  </div>
</template>
