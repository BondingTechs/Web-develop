<script lang="ts" setup>
import { useBaseStore } from "~/stores";
import { storage } from "~/utils";

// 下對上傳遞
const emit = defineEmits(["register", "forgot", "close"]);

const loginStorage = storage.get("loginData");

const loginForm = reactive({
  area: loginStorage?.area || "",
  phone: loginStorage?.phone || "",
  password: loginStorage?.password || "",
  rememberMe: !!loginStorage?.rememberMe,
});

const login = async () => {
  const { user } = useBaseStore();
  await user.login({
    area: loginForm.area,
    phone: loginForm.phone,
    password: loginForm.password,
    rememberMe: loginForm.rememberMe,
  });
};

const options = [
  "+1",
  "+1264",
  "+1268",
  "+1441",
  "+1473",
  "+1758",
  "+1767",
  "+1876",
  "+20",
  "+212",
  "+233",
  "+234",
  "+237",
  "+243",
  "+248",
  "+249",
  "+250",
  "+254",
  "+256",
  "+261",
  "+297",
  "+30",
  "+32",
  "+33",
  "+34",
  "+351",
  "+352",
  "+353",
  "+354",
  "+358",
  "+380",
  "+381",
  "+389",
  "+39",
  "+40",
  "+41",
  "+43",
  "+44",
  "+45",
  "+46",
  "+47",
  "+49",
  "+502",
  "+503",
  "+504",
  "+505",
  "+507",
  "+509",
  "+52",
  "+54",
  "+55",
  "+57",
  "+58",
  "+591",
  "+595",
  "+598",
  "+60",
  "+61",
  "+62",
  "+64",
  "+65",
  "+66",
  "+674",
  "+675",
  "+676",
  "+679",
  "+7",
  "+7",
  "+81",
  "+82",
  "+852",
  "+853",
  "+86",
  "+880",
  "+886",
  "+90",
  "+91",
  "+92",
  "+93",
  "+94",
  "+960",
  "+962",
  "+964",
  "+965",
  "+966",
  "+967",
  "+967",
  "+971",
  "+973",
  "+975",
  "+975",
  "+995",
  "+998",
];
</script>

<template>
  <div class="flex flex-col justify-center p-12">
    <div class="flex items-center justify-between mb-7">
      <div class="text-xl font-bold text-gray-800 dark:text-gray-200">
        登入帳號
      </div>

      <UnoIcon
        class="i-ion-ios-close-circle-outline text-2xl cursor-pointer"
        @click="$emit('close')"
      />
    </div>

    <UIForm @submit="login">
      <div>
        <div class="flex items-center mb-2">
          <label
            for="phone"
            class="block font-bold tracking-wide"
            :class="[{ 'cursor-pointer': 'phone' }]"
            v-text="'手機'"
          />
        </div>
        <div class="lg:flex flex-wrap">
          <UIFormSelect
            class="mr-0 lg:mr-2 lg:w-24 w-full lg:mb-0 mb-3"
            id="phone"
            :options="options"
            v-model="loginForm.area"
          />
          <UIFormText
            id="phone"
            v-model="loginForm.phone"
            class="mb-3 flex-1"
            placeholder="輸入手機號碼"
          />
        </div>
      </div>
      <UIFormPassword
        id="password"
        v-model="loginForm.password"
        label="密碼"
        placeholder="長度至少為8,英數組合"
      />
      <div class="flex items-center justify-between py-4 mb-2 text-sm">
        <div>
          <label class="flex items-center cursor-pointer check">
            <input
              v-model="loginForm.rememberMe"
              type="checkbox"
              name="checkbox-forced-colors-checked"
            />
            <UnoIcon
              v-if="loginForm.rememberMe"
              class="i-ion-checkbox-outline"
            />
            <UnoIcon v-else class="i-ion-android-checkbox-outline-blank" />
            <span class="ml-2">記住我</span>
          </label>
        </div>
        <span class="cursor-pointer" @click="emit('forgot')">忘記密碼</span>
      </div>
      <UIFormSubmit class="mb-7" text="送出" :center="true" @click="login" />
      <div
        class="text-sm font-bold tracking-wide text-center cursor-pointer"
        @click="$emit('register')"
      >
        註冊新帳號
      </div>
    </UIForm>
  </div>
</template>

<style lang="scss" scoped>
.check input {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
