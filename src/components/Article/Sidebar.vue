<script lang="ts" setup>
defineProps({
  mode: {
    type: String,
    default: 'normal',
  },
  categories: {
    type: Array<any>,
    default: () => [],
  },
})
</script>

<template>
  <div
    :class="{
      'fixed top-0 pt-13 hidden lg:flex lg:pl-8 lg:w-56 h-screen border-r border-gray-900/10 dark:border-gray-50/[0.2]':
        mode === 'normal',
      'relative flex-1 flex flex-col w-full': mode === 'mobile',
    }"
  >
    <div
      class="flex-1 py-4 pl-0 pr-4 overflow-y-auto rounded lg:pl-0 bg-gary-200"
    >
      <ul>
        <li v-for="category in categories" :key="category.slug">
          <UIAnchor
            :to="`/news/category/${category.slug}`"
            class="flex items-center group hover:no-underline mb-4"
          >
            <div
              class="flex items-center px-2 py-2 mr-4 duration-200 rounded-md shadow-sm ring-1 ring-slate-900/5 group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10"
              :class="{
                'text-white dark:text-white group-hover:bg-sky-500 bg-sky-500':
                  $route.params.categorySlug === category.slug,
                'text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700':
                  $route.params.categorySlug !== category.slug,
              }"
            >
              <UnoIcon class="i-uil-apps text-xs" />
            </div>
            <span
              class="text-sm font-semibold capitalize duration-200"
              :class="{
                'font-extrabold text-sky-500 dark:text-sky-400':
                  $route.params.slug === category.slug,
              }"
            >
              {{ category?.name }}
            </span>
          </UIAnchor>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.page-container {
  width: 100%;
  @media (min-width: 1024px) {
    width: calc(100% - 14rem);
  }
}
</style>
