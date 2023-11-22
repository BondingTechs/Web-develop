<script lang="ts" setup>
import { useBaseStore } from "@/stores";
definePageMeta({
  auth: true,
});

const form: any = reactive({
  idCard: "",
  positive: null,
});

const $loading = useState("loading");
const $alert = useState("alert");
const router = useRouter();

const submit = async () => {
  $loading.value = true;

  const { error, message } = await useHttpFetchPost("/user/identity-verify", {
    body: form,
    multipart: true,
  });
  $loading.value = false;
  if (error && message) {
    return ($alert.value = {
      type: "error",
      text: message,
      center: true,
    });
  }

  const { user } = useBaseStore();
  user.updateField({ identityStatus: 21, idCard: form.idCard });

  return ($alert.value = {
    type: "success",
    text: "送出成功，等待管理員審核",
    center: true,
    action: () => router.push("/my/account"),
  });
};

const verify = () => {
  // if (!idCardRegex.test(form.idCard)) {
  //   return ($alert.value = {
  //     type: "error",
  //     text: "身分證格式錯誤",
  //     center: true,
  //   });
  // }
  if (!form.positive) {
    return ($alert.value = {
      type: "error",
      text: "尚未上傳照片",
      center: true,
    });
  }

  submit();
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between sticky">
      <div class="flex items-center space-x-2">
        <div class="flex items-center cursor-pointer" @click="$router.go(-1)">
          <UnoIcon class="i-ic-round-arrow-back-ios text-sm lg:text-base" />
        </div>
        <h1 class="text-xl font-bold">身份驗證</h1>
      </div>
      <div
        class="group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 lg:h-9 lg:leading-9 h-7 leading-7 flex items-center lg:text-base text-sm"
        @click="verify"
      >
        <span class="lg:pr-2 duration-150 pr-1"> 送出 </span>
        <UnoIcon class="i-ic-round-arrow-forward-ios" />
      </div>
    </div>

    <div class="py-3">
      <UIForm class="max-w-[28em]" @submit="verify">
        <UIFormText
          v-model="form.idCard"
          label="身分證/護照"
          class="mb-5"
          :require="true"
        />
        <UIFormImage
          id="positive"
          v-model="form.positive"
          label="照片"
          class="mb-5"
          :require="true"
        />
      </UIForm>
    </div>
  </div>
</template>
