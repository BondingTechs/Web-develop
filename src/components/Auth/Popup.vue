<script lang="ts" setup>
import { TransitionChild, TransitionRoot } from '@headlessui/vue'

const type = ref('login')
const $showAuth = useState<boolean>('showAuth', () => false)
const $bodyLock = useState('body.lock')

const close = () => {
  $showAuth.value = false
}

watch(
  () => $showAuth.value,
  (val) => {
    $bodyLock.value = val
    if (!val) {
      setTimeout(() => {
        type.value = 'login'
      }, 400)
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <TransitionRoot :show="$showAuth" appear>
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
            @click="close"
          />

          <div
            class="absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-11/12 backdrop-filter backdrop-blur w-xl left-1/2 top-1/2 max-h-4/5 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow"
          >
            <div>
              <AuthLoginForm
                v-if="type === 'login'"
                @register="type = 'register'"
                @forgot="type = 'forgot'"
                @close="close"
              />
              <AuthRegisterForm
                v-else-if="type === 'register'"
                @cancel="type = 'login'"
                @close="close"
              />
              <AuthForgotForm
                v-else-if="type === 'forgot'"
                @cancel="type = 'login'"
                @close="close"
              />
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
