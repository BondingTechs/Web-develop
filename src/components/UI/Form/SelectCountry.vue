<script setup>
import { computed, onActivated, onMounted, ref, watch } from '@vue/runtime-core'

const props = defineProps(['modelValue', 'label', 'placeholder', 'options'])
const emit = defineEmits(['update:modelValue', 'select'])

const dropdownShow = ref(false)
const searchText = ref('')

const select = (value) => {
  dropdownShow.value = false
  emit('update:modelValue', value)
  emit('select', value)
}

const optionsFilter = computed(() => {
  return props.options?.filter((item) => {
    return item.name.toLowerCase().includes(searchText.value.toLowerCase())
  })
})
</script>

<template>
  <div class="form-group form-group_select_popup">
    <label v-if="label">{{ label }}</label>
    <div class="relative flex items-center model">
      <div class="relative flex items-center w-full select" @click="dropdownShow = true">
        <span v-if="modelValue" class="text-black">{{ modelValue?.name }}</span>
        <span v-else class="text-sixary-100">Choose...</span>
      </div>
    </div>

    <popup :visible="dropdownShow" @close="dropdownShow = false">
      <div class="px-4 pt-3">
        <v-input-text v-model="searchText" placeholder="Search..." />
      </div>
      <div
        v-for="(option, i) in optionsFilter"
        :key="i"
        class="flex items-center w-full py-2"
        :class="i !== optionsFilter.length - 1 ? 'border-b border-smoke' : 'mb-3'"
        @click="select(option)"
      >
        <img class="w-6 mr-2" :src="svg(option.icon ?? '')">
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
        content: '';
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
