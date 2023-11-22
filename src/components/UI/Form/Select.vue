<script setup>
const props = defineProps([
  "modelValue",
  "label",
  "placeholder",
  "options",
  "disabled",
  "selected",
]);
const emit = defineEmits(["update:modelValue"]);

// state:styles
const defaultStyle = computed(() =>
  props.disabled
    ? `
  block w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
  text-opacity-50
  dark:border-gray-50/[0.2] dark:bg-gray-800`
    : `
  block w-full border
  duration-200
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
);

const labelSizeStyles = reactive({
  lg: "text-base",
  md: "text-sm",
  sm: "text-xs",
  xs: "text-xs",
});

const inputSizeStyles = reactive({
  lg: "h-12 px-4 text-lg rounded-lg",
  md: "h-10 px-4 text-base rounded",
  sm: "h-8 px-4 text-sm rounded",
  xs: "h-7 px-4 text-xs rounded",
});

// state
const labelSize = computed(
  () => labelSizeStyles[props.size] || labelSizeStyles.md
);
const inputSize = computed(
  () => inputSizeStyles[props.size] || inputSizeStyles.md
);
</script>

<template>
  <div>
    <div class="flex items-center mb-2 empty:hidden" :class="labelSize">
      <label
        v-if="!!label"
        :for="id"
        class="block font-bold tracking-wide"
        :class="[{ 'cursor-pointer': id }]"
        v-text="label"
      />
      <slot name="label" />
    </div>
    <div class="relative model flex">
      <select
        :value="modelValue"
        :class="[{ 'text-center': center }, defaultStyle, inputSize]"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-for="option in options" :value="option" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-group_select {
  select {
    padding: 9px 15px;
    border-radius: 6px;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%);
    background-position: calc(100% - 15px) calc(1em + 4px),
      calc(100% - 10px) calc(1em + 4px);
    background-size: 5px 4px, 5px 4px;
    background-repeat: no-repeat;

    // @apply bg-transparent w-full border border-sixary-200;
  }
}
</style>
