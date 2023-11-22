<script lang="ts" setup>
import { TransitionChild, TransitionRoot } from '@headlessui/vue'

const $loading = useState('loading', () => false)
const $bodyLock = useState('body.lock')
watch(
  () => $loading.value,
  (val) => {
    $bodyLock.value = val
  },
)
</script>

<template>
  <Teleport to="body">
    <TransitionRoot :show="$loading" appear>
      <TransitionChild
        as="template"
        enter="duration-150 linear"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-150 linear"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed top-0 left-0 w-full h-full z-20">
          <div
            class="absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50"
          />
          <IconLoading
            class="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
          />
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
