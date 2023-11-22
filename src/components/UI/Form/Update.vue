<script setup>
import { ref } from '@vue/reactivity'
import { watch, watchEffect } from '@vue/runtime-core'

const props = defineProps(['modelValue', 'label', 'placeholder', 'button'])
const emit = defineEmits(['update:modelValue'])

const image = ref(null)

watchEffect(() => {
  emit('update:modelValue', image.value)
})

const importData = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = (_) => {
    const files = Array.from(input.files)
    image.value = files[0]
  }
  input.click()
}
</script>

<template>
  <div class="form-group form-group_input__text">
    <label>{{ label }}</label>
    <div class="relative model">
      <div class="flex items-center">
        <div
          class="flex-1 mr-2 border rounded-md input border-sixary-200"
          :class="image?.name ? 'text-primary-100' : 'text-sixary-200'"
        >
          {{ image?.name || placeholder }}
        </div>
        <div class="px-5 py-2 font-medium text-black rounded-md text-13 bg-smoke" @click="importData">
          {{ button }}
        </div>
      </div>

      <img :src="preview" class="img-fluid">
      <div class="absolute transform -translate-y-1/2 right-2 top-1/2">
        <slot name="symbol" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  padding: 9px 15px;
  border-radius: 6px;
}
</style>
