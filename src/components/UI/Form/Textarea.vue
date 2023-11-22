<script setup>
const props = defineProps({
  modelValue: {
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
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
  center: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
  },
  id: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 4,
  },
})
const emit = defineEmits(['update:modelValue'])

// state:styles
const defaultStyle = computed(() =>
  props.disabled
    ? `
  w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
  text-opacity-50
  dark:border-gray-50/[0.2] dark:bg-gray-800`
    : `
  w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
)
const labelSizeStyles = reactive({
  lg: 'text-base',
  md: 'text-sm',
  sm: 'text-xs',
  xs: 'text-xs',
})
const inputSizeStyles = reactive({
  lg: 'py-2 px-4 text-lg rounded-lg',
  md: 'py-2 px-4 text-base rounded',
  sm: 'py-2 px-4 text-sm rounded',
  xs: 'py-2 px-4 text-xs rounded',
})

// state
const labelSize = computed(
  () => labelSizeStyles[props.size] || labelSizeStyles.md
)
const inputSize = computed(
  () => inputSizeStyles[props.size] || inputSizeStyles.md
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
    <div class="relative model">
      <textarea
        :id="id"
        :rows="props.rows"
        :class="[{ 'text-center': center }, defaultStyle, inputSize]"
        :placeholder="placeholder"
        :value="props.modelValue || value"
        :disabled="disabled"
        :required="required"
        @input="onInput"
      />

      <div class="absolute transform -translate-y-1/2 right-2 top-1/2">
        <slot name="symbol" />
      </div>
    </div>
  </div>
</template>
