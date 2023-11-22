<script lang="ts" setup>
const props = defineProps({
  text: {
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
})

// state:styles
const defaultStyle: any = `
  block w-full border outline-none font-bold
  bg-blue-500 text-light-200
  opacity-80 hover:opacity-100 duration-150
`
const sizeStyles: any = reactive({
  lg: 'h-12 leading-12 px-4 text-lg rounded-lg',
  md: 'h-10 leading-10 px-4 text-base rounded',
  sm: 'h-8 leading-8 px-4 text-sm rounded',
  xs: 'h-7 leading-7 px-4 text-xs rounded',
})

const selectSize = computed(() => sizeStyles[props.size] || sizeStyles.md)
</script>

<template>
  <div>
    <div
      class="cursor-pointer"
      :class="[{ 'text-center': center }, selectSize, defaultStyle]"
      v-text="text"
    />
  </div>
</template>
