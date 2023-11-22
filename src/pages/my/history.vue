<script lang="ts" setup>
definePageMeta({
  auth: true,
});
const list: any = ref([]);
const pagination: any = ref({});

const size = 10;

const types = ref([
  { label: "新聞", value: "article" },
  { label: "小知識", value: "tip" },
]);
const type = ref("article");

const loading = ref(true);
const loaded = computed(
  () =>
    pagination.value.total <= pagination.value.size * pagination.value.page ??
    false
);

try {
  const { data } = await useHttpFetchPost("/my/history", {
    body: { size, type: type.value },
  });
  list.value = data.list;
  pagination.value = data.pagination;
  loading.value = false;
} catch {}

const reset = () => {
  list.value = [];
  pagination.value = {};
};

watch(type, async (val) => {
  loading.value = true;
  reset();
  const { data } = await useHttpFetchPost("/my/history", {
    body: { size, type: val },
  });
  list.value = data.list;
  pagination.value = data.pagination;
  loading.value = false;
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
  <div>
    <div class="flex items-center sticky mb-3">
      <div
        class="lg:hidden mr-2 flex items-center cursor-pointer"
        @click="$router.go(-1)"
      >
        <UnoIcon class="i-ic-round-arrow-back-ios text-sm lg:text-base" />
      </div>
      <h1 class="text-lg lg:text-xl font-bold">瀏覽紀錄</h1>
    </div>
    <div class="flex flex-wrap items-center space-x-4 text-sm mb-3">
      <div
        v-for="(item, index) in types"
        :key="index"
        class="cursor-pointer h-8 leading-8 px-5 border border-gray-200 dark-border-opacity-20 rounded-full duration-200"
        :class="{ 'bg-gray-200 dark:bg-opacity-10': type === item.value }"
        @click="type = item.value"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="py-3">
      <div v-if="type === 'article'">
        <ArticleLoopRow
          tag="h3"
          :list="list ?? []"
          :infinite="true"
          :loading="loading"
        />
      </div>
      <div v-else-if="type === 'tip'">
        <TipRow :list="list ?? []" />
      </div>

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
