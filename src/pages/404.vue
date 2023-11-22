<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
// const { t } = useLang()
const t = (e: any) => e

// compiler macro
useHead(() => ({
  title: capitalize(t('pages.404.title')),
}))
</script>

<template>
  <PageWrapper class="flex flex-col items-center justify-center">
    <Error :code="404" />
  </PageWrapper>
</template>
