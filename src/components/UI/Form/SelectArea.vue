<script setup>
const props = defineProps(["modelValue", "label", "placeholder", "options"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-group form-group_select">
    <label>{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>
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
