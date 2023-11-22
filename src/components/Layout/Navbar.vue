<script lang="ts" setup>
import type { IApp } from "~/utils/initApp";

export interface IMenuItem {
  type: "link" | "button";
  text: string;
  href?: any;
  route?: any;
}

const app = useState<IApp>("app");

const menus = ref<IMenuItem[]>([{ type: "link", text: "新聞", route: "/" }]);
</script>

<template>
  <div class="h-12">
    <div
      class="h-12 fixed flex items-center w-screen top-0 left-0 backdrop-filter backdrop-blur top-0 flex-none transition-colors duration-300 z-20 border-b border-gray-900/10 dark:border-gray-50/[0.2] bg-white dark:bg-slate-900/[0.7]"
    >
      <div class="cma">
        <div class="lg:px-8 lg:mx-0">
          <div class="relative flex items-center">
            <!-- Logo -->
            <slot name="title">
              <NuxtLink
                tag="a"
                class="flex-none mr-3 overflow-hidden font-bold text-gray-900 md:w-auto text-md dark:text-gray-200"
                to="/"
              >
                <span class="sr-only">home</span>
                <span class="flex items-center">
                  <img class="lg:w-18 w-12 mr-2" src="/logo.png" />
                  <span class="leading-7 mt-[1px]">{{ app.name }}</span>
                </span>
              </NuxtLink>
            </slot>
            <!-- Desktop Menu -->
            <div class="desktop-menu relative ml-auto flex">
              <nav
                class="flex items-center text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300"
                role="navigation"
              >
                <ul class="flex items-center space-x-8">
                  <li v-for="(item, i) in menus" :key="i">
                    <UIAnchor
                      v-if="item.type === 'link'"
                      :to="item.route ? item.route : undefined"
                      :href="item.href ? item.href : undefined"
                      class="capitalize hover:no-underline hover:text-slate-900 hover:dark:text-white"
                    >
                      {{ item.text }}
                    </UIAnchor>
                    <UIButton
                      v-else-if="item.type === 'button'"
                      :text="item.text"
                      size="xs"
                      class="font-extrabold capitalize"
                      :to="item.route ? item.route : undefined"
                      :href="item.href ? item.href : undefined"
                    />
                  </li>
                </ul>
              </nav>

              <div
                class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]"
              >
                <TemSizeChange />
                <TemThemeChange />
                <LayoutNavbarUser />
              </div>
            </div>

            <!-- Mobile Menu -->
            <div class="mobile-menu ml-auto">
              <div
                class="text-sm md:text-base flex space-x-2 md:space-x-4 border-l pl-4 md:pl-6 border-gray-900/10 dark:border-gray-50/[0.2]"
              >
                <TemSizeChange />
                <TemThemeChange />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desktop-menu {
  @media only screen and (max-width: 767px) {
    display: none;
  }
}
.mobile-menu {
  @media only screen and (min-width: 768px) {
    display: none;
  }
}
</style>