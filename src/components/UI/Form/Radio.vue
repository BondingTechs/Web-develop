<script setup>
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Number,
    default: NaN,
  },
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  border: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const choose = (val) => {
  // console.log('choose')
  emit('update:modelValue', val)
}

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
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`,
)
// const labelSizeStyles = reactive({
//   lg: 'text-base',
//   md: 'text-sm',
//   sm: 'text-xs',
//   xs: 'text-xs',
// })
const inputSizeStyles = reactive({
  lg: 'h-12 px-4 text-lg rounded-lg',
  md: 'h-10 px-4 text-base rounded',
  sm: 'h-8 px-4 text-sm rounded',
  xs: 'h-7 px-4 text-xs rounded',
})
</script>

<template>
  <div class="form-group form-group_input__radio">
    <label
      :for="id"
      class="block mb-2 font-bold tracking-wide cursor-pointer text-sm"
      v-text="label"
    />
    <div
      role="radiogroup"
      :class="[defaultStyle, inputSizeStyles.md]"
      class="flex flex-wrap space-x-3"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="flex items-center py-3"
      >
        <div
          class="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative"
          @click="choose(option.value)"
        >
          <input
            :id="option.value"
            :checked="modelValue === option.value || index === 0"
            :value="option.value"
            type="radio"
            name="radio"
            class="checkbox appearance-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
          >
          <div
            class="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1"
          />
        </div>
        <label
          :for="option.value"
          class="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100"
        >{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkbox:checked {
  border: none;
}
.checkbox:checked + .check-icon {
  display: flex;
}
</style>
