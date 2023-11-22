<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const imageData: any = ref('')

const labelSizeStyles = reactive({
  lg: 'text-base',
  md: 'text-sm',
  sm: 'text-xs',
  xs: 'text-xs',
})

// state
const labelSize = computed(() => labelSizeStyles.md)

// upload image
const $message = useState('message')
const uploadImage = async (file: any) => {
  const formData = new FormData()
  formData.append('file', file)

  const {
    data: url,
    error,
    message,
  } = await useHttpFetchPost('/comm/upload', {
    body: formData,
    multipart: true,
  })
  if (error)
    return ($message.value = message)
  return url
}

const updateImage = async (event: any) => {
  const input = event.target
  if (input.files && input.files[0]) {
    const url = await uploadImage(input.files[0])
    emit('update:modelValue', url)

    const reader = new FileReader()
    reader.onload = (e) => {
      imageData.value = e.target?.result || ''
    }
    reader.readAsDataURL(input.files[0])
  }
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
    <div
      class="relative border border-gray-300 border-opacity-40 rounded dark:bg-white/[0.05] bg-gray-100"
      :class="{ model: !imageData }"
    >
      <div v-if="imageData.length > 0">
        <img class="preview w-full h-full" :src="imageData">
      </div>

      <div v-else class="p-c text-xs">
        點擊上傳圖片
      </div>

      <input
        :id="id"
        type="file"
        accept="image/*"
        class="absolute w-full h-full cursor-pointer opacity-0 top-0 left-0"
        :required="required"
        @change="updateImage"
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.model {
  padding-bottom: 58%;
}
</style>
