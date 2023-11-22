<script lang="ts" setup>
const emit = defineEmits(['submit'])

// methods
const submit = () => {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="submit">
    <slot />
    <button type="submit" hidden />
  </form>
</template>
