<script lang="ts" setup>
import { passwordRegex } from "~~/src/utils/regex";
definePageMeta({
  auth: true,
});

const form = reactive({
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
});

const router = useRouter();
const $loading = useState("loading");
const $alert = useState("alert");

const submit = async () => {
  const { oldPassword, newPassword, newPasswordConfirm } = form;
  if (!passwordRegex.test(newPassword)) {
    return ($alert.value = {
      type: "error",
      text: "密碼須為英數混合8位數以上",
      center: true,
    });
  }
  if (
    !oldPassword.length ||
    !newPassword.length ||
    !newPasswordConfirm.length
  ) {
    return ($alert.value = {
      type: "error",
      text: "欄位不能留空",
      center: true,
    });
  }

  if (newPassword !== newPasswordConfirm) {
    return ($alert.value = {
      type: "error",
      text: "密碼不一致",
      center: true,
    });
  }

  $loading.value = true;
  const { error, message } = await useHttpFetchPost("/user/reset-password", {
    body: form,
  });
  $loading.value = false;
  if (error && message) {
    return ($alert.value = {
      type: "error",
      text: message,
      center: true,
    });
  }

  return ($alert.value = {
    type: "success",
    title: "修改成功",
    action: () => router.go(-1),
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
        <h1 class="text-xl font-bold">修改密碼</h1>
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
        <UIFormPassword
          id="old-password"
          v-model="form.oldPassword"
          class="mb-3"
          label="舊密碼"
          placeholder="請輸入舊密碼"
        />
        <UIFormPassword
          id="new-password"
          v-model="form.newPassword"
          class="mb-3"
          label="新密碼"
          placeholder="長度至少為8,英數組合"
        />
        <UIFormPassword
          id="new-password-confirm"
          v-model="form.newPasswordConfirm"
          label="確認密碼"
          placeholder="再次輸入新密碼"
        />
      </UIForm>
    </div>
  </div>
</template>
