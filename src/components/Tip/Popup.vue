<script lang="ts" setup>
import { TransitionChild, TransitionRoot } from '@headlessui/vue'

const $tip = useState('tip.data', () => {
  return {
    id: 0,
    title: '',
    content: '',
    publishDate: '',
  }
})

const $show = useState('tip.show', () => false)

const close = () => {
  $show.value = false
}

// collection
const isCollection = ref(false)
const collection = async (id: number) => {
  const { data, error } = await useHttpFetchPost('/tip/collection', {
    body: { id },
  })
  if (!error)
    isCollection.value = true
}
</script>

<template>
  <Teleport to="body">
    <TransitionRoot :show="$show" appear>
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
            class="px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"
          >
            <div
              v-if="$tip.title"
              class="sticky top-0 pt-7 pb-2 flex flex-wrap justify-between text-lg pl-[0.1em] tracking-widest font-bold bg-light-100 dark:bg-gray-800"
            >
              {{ $tip.title }}
              <div class="flex items-center space-x-3">
                <div
                  class="cursor-pointer flex items-center"
                  @click="collection($tip.id)"
                >
                  <UnoIcon v-show="!isCollection" class="i-ion-heart-outline w-6" />
                  <UnoIcon v-show="isCollection" class="i-ion-heart-sharp text-red-600 w-6" />
                </div>
                <UnoIcon
                  class="i-ion-ios-close-circle-outline text-2xl w-6 cursor-pointer"
                  @click="close"
                />
              </div>
            </div>
            <div class="text-sm opacity-60 relative">
              {{ $tip.publishDate }}
            </div>
            <div
              v-if="$tip.content"
              class="py-4 relative"
              v-html="$tip.content"
            />
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
