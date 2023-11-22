<script lang="ts" setup>
import type { IApp } from '~/utils/initApp'

export interface IMenuItem {
  type: 'link' | 'button'
  text: string
  href?: any
  route?: any
}

const app = useState<IApp>('app')

const menus = ref<any[]>([
  { type: 'link', text: '首頁', icon: 'i-uil-home-alt', route: '/' },
  { type: 'link', text: '分類', icon: 'i-uil-create-dashboard', route: '/news/categories' },
  { type: 'link', text: '收藏', icon: 'i-uil-heart', route: '/my/collections' },
  { type: 'link', text: '個人', icon: 'i-uil-user', route: '/my' },
])
</script>

<template>
  <div
    class="md:hidden h-15 fixed flex items-center w-screen bottom-0 left-0 flex-none transition-colors duration-300 z-20 bg-white border-t border-gray-900/10 dark:bg-gray-900 dark:border-gray-700"
  >
    <div class="flex justify-around w-full">
      <NuxtLink v-for="(menu, index) in menus" :key="index" class="text-center px-2" :to="menu.route">
        <UnoIcon class="mx-auto text-xl" :class="menu.icon" />
        <p class="text-xs -mt-1 transform scale-90">
          {{ menu.text }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
