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

const close = () => {
  emit("close");
};

const genderOptions = ref([
  { value: 13, label: "男性" },
  { value: 14, label: "女性" },
]);

const registerForm: {
  firstName: string;
  lastName: string;
  birthday: string;
  area: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  gender: number;
  verifyCode: string;
} = reactive({
  firstName: "",
  lastName: "",
  birthday: "",
  area: "",
  phone: "",
  password: "",
  passwordConfirm: "",
  gender: genderOptions.value[0].value,
  verifyCode: "",
});

const { user } = useBaseStore();

const $alert = useState("alert");
const $loading = useState("loading");

const getCaptcha = async () => {
  $loading.value = true;
  const { error, message, data } = await useHttpFetchPost(
    "/auth/register-captcha",
    {
      body: { area: registerForm.area, phone: registerForm.phone },
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

const openMemberRule = (path: string) => {
  const $showAuth = useState<boolean>("showAuth");
  const router = useRouter();
  $showAuth.value = false;
  router.push(path);
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
      <div class="text-xl font-bold text-gray-800 dark:text-gray-200">註冊</div>

      <UnoIcon
        class="i-ion-ios-close-circle-outline text-2xl cursor-pointer"
        @click="close"
      />
    </div>

    <UIForm @submit="user.register(registerForm)">
      <div class="flex space-x-4 mb-3">
        <UIFormText
          id="firstName"
          v-model="registerForm.firstName"
          label="姓氏"
          class="flex-1"
        />
        <UIFormText
          id="lastName"
          v-model="registerForm.lastName"
          label="名字"
          class="flex-1"
        />
      </div>
      <div>
        <div class="flex items-center mb-2" :class="labelSize">
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
            v-model="registerForm.area"
          />
          <UIFormText
            id="phone"
            v-model="registerForm.phone"
            class="mb-3 flex-1"
            :is-phone="true"
            @captcha="getCaptcha"
          />
        </div>
      </div>
      <UIFormCaptcha
        v-model="registerForm.verifyCode"
        class="mb-3"
        label="驗證碼"
        placeholder="請輸入手機驗證碼"
      />
      <UIFormPassword
        id="password"
        v-model="registerForm.password"
        label="密碼"
        class="mb-3"
        placeholder="長度至少為8,英數組合"
      />
      <UIFormPassword
        id="password"
        v-model="registerForm.passwordConfirm"
        label="確認密碼"
        class="mb-3"
        placeholder="再次輸入密碼"
      />
      <UIFormDate
        id="birthday"
        v-model="registerForm.birthday"
        label="生日"
        class="mb-3"
      />
      <UIFormRadio
        v-model="registerForm.gender"
        class="mb-10"
        label="性別"
        :options="genderOptions"
      />
      <div class="text-center text-sm mb-5">
        繼續使用代表您同意與接受 鍵結科技 的
        <span
          class="text-blue-300 cursor-pointer"
          @click="openMemberRule('/member-rule')"
        >
          《會員條款》
        </span>
      </div>
      <UIFormSubmit
        class="mb-7"
        text="送出"
        :center="true"
        @click="user.register(registerForm)"
      />
      <div
        class="text-sm font-bold tracking-wide text-center cursor-pointer"
        @click="cancel"
      >
        已有帳號，前往登入
      </div>
    </UIForm>
  </div>
</template>
