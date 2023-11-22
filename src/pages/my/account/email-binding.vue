<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBaseStore } from "~/stores";
import { emailRegex } from "~/utils/regex";
definePageMeta({
  auth: true,
});

const form: any = reactive({
  email: "",
});

const { user } = useBaseStore();
const { info } = storeToRefs(user);

const $loading = useState("loading");
const $alert = useState("alert");
const $message = useState("message");

const submit = async () => {
  const { email } = form;
  if (!email.length) return ($message.value = "欄位不能留空");

  if (!emailRegex.test(email)) return ($message.value = "信箱格式錯誤");

  $loading.value = true;
  const { error, message } = await useHttpFetchPost("/user/email-binding", {
    body: { email },
  });
  $loading.value = false;
  if (error && message) {
    return ($alert.value = {
      type: "error",
      text: message,
      center: true,
    });
  }

  user.updateField({
    emailStatus: 18,
  });

  return ($alert.value = {
    type: "success",
    title: "已發送驗證信，請至信箱查收",
  });
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between sticky">
      <div class="flex items-center space-x-2">
        <div class="flex items-center cursor-pointer" @click="$router.go(-1)">
          <UnoIcon class="i-ic-round-arrow-back-ios text-sm lg:text-base" />
        </div>
        <h1 class="text-xl font-bold">
          {{ info?.email?.length ? "修改" : "綁定" }}Email
        </h1>
      </div>
      <div
        class="group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 lg:h-9 lg:leading-9 h-7 leading-7 flex items-center lg:text-base text-sm"
        @click="submit"
      >
        <span class="lg:pr-2 duration-150 pr-1"> 送出 </span>
        <UnoIcon class="i-ic-round-arrow-forward-ios" />
      </div>
    </div>

    <div class="py-3">
      <UIForm @submit="submit">
        <UIFormText
          id="email"
          v-model="form.email"
          label="Email"
          class="mb-3"
          placeholder="example@domain.com"
        />
      </UIForm>
    </div>
  </div>
</template>
