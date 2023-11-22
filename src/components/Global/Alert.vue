<script lang="ts" setup>
import { TransitionChild, TransitionRoot } from "@headlessui/vue";

const $alert = useState("alert", () => {
  return {
    type: "",
    title: "",
    text: "",
    center: false,
    action: () => {},
  };
});

const show = ref(false);
const $bodyLock = useState("body.lock");

watch(
  () => show.value,
  (val) => {
    $bodyLock.value = val;
  }
);

watch(
  () => $alert.value,
  (val) => {
    if (val.title || val.text) show.value = true;
  }
);

const reset = () => {
  $alert.value = {
    type: "",
    title: "",
    text: "",
    center: false,
    action: () => {},
  };
};

const close = async () => {
  show.value = false;
  if ($alert.value.action) $alert.value.action();

  setTimeout(() => {
    reset();
  }, 150);
};

// icon 圖片
const imgTypes: any = {
  error: "/delete.png",
  info: "/alert.png",
  idea: "/idea.png",
  success: "/check.png",
};

const imgType = computed(() => {
  return imgTypes[$alert.value.type] || "/alert.png";
});
</script>

<template>
  <Teleport to="body">
    <TransitionRoot :show="show" appear>
      <TransitionChild
        as="template"
        enter="duration-150 linear"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-150 linear"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed top-0 left-0 w-full h-full z-30">
          <div
            class="absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50"
            @click="close"
          />

          <div
            class="p-12 min-w-xs md:min-w-sm absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-11/12 backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow"
            :class="[{ 'text-center': $alert.center }]"
          >
            <img class="mx-auto mb-6 w-26" :src="imgType" />
            <div
              v-if="$alert.title"
              class="text-lg pl-[0.1em] tracking-widest font-bold text-center"
              :class="{ 'pb-4': $alert.text }"
            >
              {{ $alert.title }}
            </div>
            <div v-if="$alert.text">
              {{ $alert.text }}
            </div>
          </div>
        </div>
      </TransitionChild>
    </TransitionRoot>
  </Teleport>
</template>

<style lang="scss" scoped>
.register-form {
  border-radius: 10px 0 0 10px;
}
</style>
