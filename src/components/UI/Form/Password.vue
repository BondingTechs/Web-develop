<script setup>
import { ref } from '@vue/runtime-core'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
  },
  id: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const showPw = ref(true)

// state:styles
// const defaultStyle = `
//   block w-full border
//   duration-200
//   bg-transparent border-gray-600/[0.3] focus:bg-gray-200
//   dark:border-gray-50/[0.2] dark:focus:bg-gray-800
// `
const defaultStyle = computed(() =>
  props.disabled
    ? `
  block w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
  dark:border-gray-50/[0.2] dark:bg-gray-800`
    : `
  block w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`,
)

const labelSizeStyles = reactive({
  lg: 'text-base',
  md: 'text-sm',
  sm: 'text-xs',
  xs: 'text-xs',
})
const inputSizeStyles = reactive({
  lg: 'h-12 px-4 text-lg rounded-lg',
  md: 'h-10 px-4 text-base rounded',
  sm: 'h-8 px-4 text-sm rounded',
  xs: 'h-7 px-4 text-xs rounded',
})

// state
const labelSize = computed(
  () => labelSizeStyles[props.size] || labelSizeStyles.md,
)
const inputSize = computed(
  () => inputSizeStyles[props.size] || inputSizeStyles.md,
)

// methods
const onInput = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div>
    <div class="flex items-center mb-2" :class="labelSize">
      <label
        :for="id"
        class="block font-bold tracking-wide"
        :class="[{ 'cursor-pointer': id }]"
        v-text="label"
      />
      <slot name="label" />
    </div>
    <div class="flex items-center">
      <div class="relative model flex-1">
        <input
          :id="id"
          :class="[defaultStyle, inputSize]"
          :type="showPw ? 'password' : 'text'"
          :placeholder="placeholder"
          :value="modelValue || value"
          :disabled="disabled"
          autocomplete="on"
          @input="onInput"
        >

        <div
          class="absolute flex transform -translate-y-1/2 icon top-1/2 right-2 cursor-pointer"
          @click="showPw = !showPw"
        >
          <UnoIcon v-show="showPw" class="i-ion-eye-outline" :class="{ disabled }" />
          <UnoIcon v-show="!showPw" />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
