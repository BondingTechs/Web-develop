<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  id: {
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
  length: {
    type: Number,
    default: 6,
  },
  getCaptcha: {
    type: Function,
    default: () => {},
  },
})
const emit = defineEmits(['update:modelValue', 'captcha'])

const defaultStyle = `
  block w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800
`

const sms = ref('')

const verificationKeyup = (evt) => {
  const regExp = '^\\d+$'
  const isDigit = evt.data?.match(regExp)
  const oversize = sms.value.length >= props.length

  if (isDigit && !oversize)
    sms.value += evt.data
  else if (evt.inputType === 'deleteContentBackward')
    sms.value = sms.value.substring(0, sms.value.length - 1)

  emit('update:modelValue', sms.value)
}
</script>

<template>
  <div class="mb-1 form-group form-group__captcha">
    <label
      :for="id"
      class="block mb-2 font-bold tracking-wide cursor-pointer text-sm"
      v-text="label"
    />
    <div class="flex">
      <input
        class="h-10 px-4 text-base rounded"
        :placeholder="placeholder"
        :class="defaultStyle"
        type="text"
        :value="modelValue"
        @input="verificationKeyup($event)"
      >
      <!-- <div
        class="flex ml-4 cursor-pointer items-center justify-center rounded bg-blue-500 text-white ml-auto text-sm truncate w-20"
        @click="$emit('captcha')"
      >
        發送
      </div> -->
    </div>
  </div>
</template>
