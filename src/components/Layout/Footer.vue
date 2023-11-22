<script lang="ts" setup>
// import type { IApp } from '~/utils/initApp'
// const app = useState<IApp>('app')
const app: any = useAppConfig();
</script>

<template>
  <footer class="border-t lg:border-gray-900/10 dark:border-gray-50/[0.2]">
    <section
      class="max-w-[96em] mx-auto px-4 lg:px-8 flex-1 flex w-full space-x-20"
    >
      <div class="text-xs w-full py-4 text-center md:text-left">
        <div class="text-gray-600 dark:text-gray-400">
          Copyright © 2022. All rights reserved.
          <span class="md:float-right">
            Design By <a href="#">Bonding</a>
          </span>
        </div>
      </div>
    </section>
  </footer>
</template>
