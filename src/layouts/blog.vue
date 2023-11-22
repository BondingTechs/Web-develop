<script lang="ts" setup>
const { data: categories } = await useHttpPost(
  'industry-categories',
  '/news/categories',
)

const categoriesWithoutEmpty = computed(() => {
  return categories.value?.filter((item: any) => +item.articleCount && item.parentId)
})
</script>

<template>
  <div class="w-full">
    <div class="cma flex flex-wrap">
      <div class="py-4 sidebar-container lg:w-56">
        <ArticleSidebar :categories="categoriesWithoutEmpty || []" />
      </div>
      <div class="flex flex-col page-container">
        <slot />
        <slot name="footer">
          <LayoutFooter />
        </slot>
      </div>
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
