<script lang="ts" setup>
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
  id: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

// state:styles
const defaultStyle = computed(
  () =>
    `
  w-full border
  duration-200
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
);
const labelSizeStyles: any = reactive({
  lg: "text-base",
  md: "text-sm",
  sm: "text-xs",
  xs: "text-xs",
});
const inputSizeStyles: any = reactive({
  lg: "text-lg rounded-lg",
  md: "text-base rounded",
  sm: "text-sm rounded",
  xs: "text-xs rounded",
});

// state
const labelSize = computed(
  () => labelSizeStyles[props.size] || labelSizeStyles.md
);
const inputSize = computed(
  () => inputSizeStyles[props.size] || inputSizeStyles.md
);

// quill editor
const editor: any = ref(null);
const editorOptions = {
  theme: "bubble", // 可換
};
const onInput = () => {
  if (editor.value) emit("update:modelValue", editor.value.getHTML());
};

const setHTML = () => {
  if (!editor.value) {
    setTimeout(() => {
      setHTML();
    }, 300);
  } else {
    editor.value.setHTML(props.modelValue || "");
  }
};

watch(
  () => props.modelValue,
  (val) => {
    if (!val) {
      editor.value.setHTML(val);
    }
  }
);

onMounted(() => {
  setHTML();
});

if (!process.server) {
  const { vueApp } = useNuxtApp();
  if (!vueApp.component("QuillEditor")) {
    const { QuillEditor } = await import("@vueup/vue-quill");
    vueApp.component("QuillEditor", QuillEditor);
  }
}
</script>

<template>
  <div>
    <div v-if="label" class="fic mb-2" :class="labelSize">
      <label
        :for="id"
        class="block font-bold tracking-wide"
        :class="[{ 'cursor-pointer': id }]"
        v-text="label"
      />
      <slot name="label" />
    </div>
    <div class="relative model">
      <client-only>
        <quill-editor
          ref="editor"
          theme="bubble"
          :placeholder="placeholder"
          :class="[defaultStyle, inputSize]"
          :options="editorOptions"
          @text-change="onInput"
        />
      </client-only>

      <div class="absolute transform -translate-y-1/2 right-2 top-1/2">
        <slot name="symbol" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ql-editor.ql-blank::before) {
  color: #828282;
}
</style>
