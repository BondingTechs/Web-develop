<script setup>
const props = defineProps(['modelValue', 'label', 'placeholder', 'disable', 'value', 'center'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-group form-group_input__text">
    <label>{{ label }}</label>
    <div class="relative flex items-center model">
      <slot name="prefix" />
      <input
        type="number"
        :class="{ 'text-center': center }"
        :placeholder="placeholder"
        :value="value || modelValue"
        :disabled="disable"
        @input="$emit('update:modelValue', $event.target.value)"
      >

      <div class="absolute transform -translate-y-1/2 right-2 top-1/2">
        <slot name="symbol" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.model {
  border: 1px solid var(--color-sixary-200);
  padding: 9px 15px;
  border-radius: 6px;
}
.form-group_input__text {
  input {
    width: 100%;

    &::placeholder {
      color: var(--color-sixary-200);
    }
  }
}
</style>
