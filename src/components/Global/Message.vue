<script lang="ts" setup>
import { TransitionChild, TransitionRoot } from '@headlessui/vue'

const $message = useState('message', () => '')
const show = ref(false)

const reset = () => {
  $message.value = ''
}

const close = () => {
  show.value = false
  setTimeout(() => {
    reset()
  }, 150)
}

watch(
  () => $message.value,
  (val) => {
    show.value = !!val
    setTimeout(() => {
      close()
    }, 4000)
  },
)
</script>

<template>
  <Teleport to="body">
    <TransitionRoot :show="show" appear>
      <TransitionChild
        as="template"
        enter="duration-150 linear"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-300 linear"
        leave-from=""
        leave-to="-translate-y-16"
      >
        <div
          class="py-2 px-5 fb fixed overflow-x-hidden overflow-y-auto transform -translate-x-1/2 rounded-lg lg:max-w-7/12 max-w-11/12 left-1/2 top-4 z-30 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow"
        >
          <div v-if="$message" class="pl-[0.075em] tracking-wide">
            {{ $message }}
          </div>

          <UnoIcon
            class="i-ion-ios-close-circle-outline ml-3 p-1 text-xl cursor-pointer"
            @click="close"
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
