<script lang="ts" setup>
import { useBaseStore } from "@/stores";

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["cancel", "close"]);

// methods
const cancel = () => {
  emit("cancel");
};

const forgotForm: {
  area: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  verifyCode: string;
} = reactive({
  area: "",
  phone: "",
  password: "",
  passwordConfirm: "",
  verifyCode: "",
});

const { user } = useBaseStore();
const $alert = useState("alert");
const $loading = useState("loading");

const getCaptcha = async () => {
  $loading.value = true;
  const { error, message, data } = await useHttpFetchPost(
    "/auth/forgot-captcha",
    {
      body: { area: forgotForm.area, phone: forgotForm.phone },
    }
  );
  $loading.value = false;

  if (error) {
    const $alert = useState("alert");
    $alert.value = {
      type: "error",
      title: "驗證錯誤",
      text: message,
      center: true,
    };
  }

  if (data) $alert.value = { type: "success", title: "發送成功", center: true };
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
  <div class="p-12">
    <div class="flex items-center justify-between mb-7">
      <div class="text-xl font-bold text-gray-800 dark:text-gray-200">
        忘記密碼
      </div>
      <UnoIcon
        class="i-ion-ios-close-circle-outline text-2xl cursor-pointer"
        @click="cancel"
      />
    </div>

    <UIForm @submit="user.forgot(forgotForm)">
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
            v-model="forgotForm.area"
          />
          <UIFormText
            id="phone"
            v-model="forgotForm.phone"
            class="mb-3 flex-1"
            :is-phone="true"
            @captcha="getCaptcha"
          />
        </div>
      </div>
      <UIFormCaptcha
        v-model="forgotForm.verifyCode"
        class="mb-3"
        label="驗證碼"
        placeholder="請輸入手機驗證碼"
      />
      <UIFormPassword
        id="password"
        v-model="forgotForm.password"
        label="新密碼"
        class="mb-3"
        placeholder="長度至少為8,英數組合"
      />
      <UIFormPassword
        id="password"
        v-model="forgotForm.passwordConfirm"
        label="確認密碼"
        class="mb-10"
        placeholder="再次輸入密碼"
      />
      <UIFormSubmit
        class="mb-7"
        text="送出"
        :center="true"
        @click="user.forgot(forgotForm)"
      />
    </UIForm>
  </div>
</template>
