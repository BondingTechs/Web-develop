

<script lang="ts" setup>
import { InitApp } from "~/utils/initApp";
import { useDictStore } from "./stores/dict";
InitApp();
const locale = useState<string>("locale.i18n");

const app: any = useAppConfig();
useHead({
  title: app.name,
  titleTemplate: "%s",
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content: "BondingTechs 鍵結科技官方網站",
    },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
});

const dictStore = useDictStore();
dictStore.get();

onMounted(() => {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  document.addEventListener("copy", function (e) {
    e.preventDefault();
    alert("禁止複製內容！");
  });
});

onMounted(() => {
  document.addEventListener("click", function (e: any) {
    const target = e.target;
    const tagName = target.tagName;
    const href =
      (target.getAttribute("data-href") || target.getAttribute("href")) ?? "";
    if (href) {
      if (tagName !== "A") {
        window.open(href, "_blank");
      }
      if (!href.includes(origin)) {
        useHttpFetchPost("/external-link/click", { body: { href } });
      }
    }
  });
});
</script>

<template>
  <Html :lang="locale">
    <Body
      class="bg-white text-gray-800 antialiased transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200"
    >
      <LayoutNavbar />
      <NuxtLayout class="lt-lg:pb-14">
        <NuxtLoadingIndicator />
        <div class="relative">
          <NuxtPage />
        </div>
      </NuxtLayout>
      <LayoutNavbarMobile />

      <ClientOnly>
        <AuthPopup />
        <GlobalMessage />
        <GlobalAlert />
        <GlobalLoading />
        <TipPopup />
      </ClientOnly>
    </Body>
  </Html>
</template>

<style lang="scss">
body {
  @apply bg-gray-50 dark:bg-gray-800;
}

.global-text {
  @apply text-gray-900 dark:text-gray-50;
}
</style>