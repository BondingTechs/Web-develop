<script lang="ts" setup>
import { useBaseStore } from "~/stores";
import { phoneRegex } from "~/utils/regex";
definePageMeta({
  auth: true,
});

const form: any = reactive({
  area: "+886",
  phone: "",
  verifyCode: "",
});

const $message = useState("message");
const $alert = useState("alert");
const $loading = useState("loading");

const getCaptcha = async () => {
  if (!form.phone.length) return ($message.value = "尚未輸入手機號碼");

  if (!phoneRegex.test(form.phone)) return ($message.value = "號碼格式錯誤");

  $loading.value = true;
  const { data, error, message } = await useHttpFetchPost(
    "/auth/change-captcha",
    {
      body: { area: form.area, phone: form.phone },
    }
  );
  $loading.value = false;
  if (error && message) {
    $alert.value = {
      type: "error",
      text: message,
      center: true,
    };
  }
  if (data)
    $alert.value = { type: "success", title: "發送成功，請留意手機簡訊" };
};

const router = useRouter();
const submit = async () => {
  const $loading = useState("loading");
  $loading.value = true;
  const { data, error, message } = await useHttpFetchPost(
    "/user/change-phone",
    { body: form }
  );
  $loading.value = false;
  if (error && message) {
    $alert.value = {
      type: "error",
      text: message,
      center: true,
    };
  }
  if (data) {
    $alert.value = {
      type: "success",
      title: "修改成功",
      action: () => router.go(-1),
    };
    const { user } = useBaseStore();
    user.updateField({ phone: form.phone });
  }
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
  <div>
    <div class="flex items-center justify-between sticky">
      <div class="flex items-center space-x-2">
        <div class="flex items-center cursor-pointer" @click="$router.go(-1)">
          <UnoIcon class="i-ic-round-arrow-back-ios text-sm lg:text-base" />
        </div>
        <h1 class="text-xl font-bold">修改號碼</h1>
      </div>
      <div
        class="group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 lg:h-9 lg:leading-9 h-7 leading-7 flex items-center lg:text-base text-sm"
        @click="submit"
      >
        <span class="pr-1 duration-150"> 送出 </span>
        <UnoIcon class="i-ic-round-arrow-forward-ios" />
      </div>
    </div>

    <div class="py-3">
      <UIForm @submit="submit">
        <div>
          <div class="flex items-center mb-2">
            <label
              for="phone"
              class="block font-bold tracking-wide"
              :class="[{ 'cursor-pointer': 'phone' }]"
              v-text="'手機'"
            />
          </div>
          <div class="flex flex-wrap">
            <UIFormSelect
              class="mr-2 w-24"
              id="phone"
              :options="options"
              :selected="form.area"
              v-model="form.area"
            />
            <UIFormText
              id="phone"
              v-model="form.phone"
              class="mb-3 flex-1"
              :is-phone="true"
              @captcha="getCaptcha"
            />
          </div>
        </div>
        <UIFormCaptcha
          id="captcha"
          v-model="form.verifyCode"
          class="mb-10"
          label="驗證碼"
          placeholder="請輸入手機驗證碼"
        />
      </UIForm>
    </div>
  </div>
</template>
