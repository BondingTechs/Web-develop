<script setup>
import { computed, ref } from "@vue/runtime-core";

const props = defineProps([
  "modelValue",
  "label",
  "placeholder",
  "options",
  "active",
]);
const emit = defineEmits(["update:modelValue", "select"]);

const visible = ref(false);
const activeOption = computed(() => {
  return props.options?.find((item) => item?.name === props?.active);
});

const select = (value) => {
  visible.value = false;
  emit("select", value);
};
</script>

<template>
  <div class="form-group form-group_select_popup">
    <label v-if="label">{{ label }}</label>

    <div class="relative flex items-center model">
      <div
        class="relative flex items-center mr-3 select"
        @click="visible = true"
      >
        <img
          v-if="activeOption?.icon"
          class="w-6 h-6 mr-2"
          :src="svg(activeOption?.icon)"
        />
        <div class="text-black min-h-6">
          {{ activeOption?.name }}
        </div>
      </div>

      <input
        type="number"
        class="flex-1"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <div class="absolute transform -translate-y-1/2 right-2 top-1/2">
        <slot name="symbol" />
      </div>
    </div>

    <popup :visible="visible" @close="visible = false">
      <div
        v-for="(option, i) in options"
        :key="i"
        class="flex items-center w-full px-4 py-2"
        :class="{
          'border-b border-smoke': i !== options.length - 1,
          'bg-smoke': activeOption?.name === option.name,
        }"
        @click="select(option)"
      >
        <img class="w-6 mr-2" :src="svg(option.icon ?? '')" />
        <span class="text-black">{{ option?.name }}</span>
        <div class="ml-auto" />
      </div>
    </popup>
  </div>
</template>

<style lang="scss" scoped>
.form-group_select_popup {
  .model {
    width: 100%;
    border: 1px solid var(--color-sixary-200);
    padding: 9px 15px;
    border-radius: 6px;

    .select {
      position: relative;
      min-width: 85px;
      padding-right: 13px;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        border-width: 5px 4px 0 4px;
        border-color: black transparent transparent transparent;
        opacity: 0.6;
      }
    }

    input {
      &::placeholder {
        color: var(--color-sixary-200);
      }
    }
  }
}
</style>
