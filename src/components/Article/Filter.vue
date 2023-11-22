<script lang="ts" setup>
const filterOptions = ref([
  { text: '觀看次數', value: '' },
  { text: '收藏次數', value: '' },
  { text: '上傳日期(最新)', value: '' },
  { text: '上傳日期(最舊)', value: '' },
])

const filterSelect = (select: string) => {
  return select
}
</script>

<template>
  <SortDropdown v-if="false" :options="filterOptions" @select="filterSelect" />
</template>
