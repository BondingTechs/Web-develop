<script lang="ts" setup>
import { useBaseStore } from "@/stores";
import { storeToRefs } from "pinia";
definePageMeta({
  auth: true,
});

const form: any = reactive({
  firstName: "",
  lastName: "",
  birthday: "",
  gender: "",
  intro: "",
});

const userInfo: any = reactive({
  phone: "",
  email: "",
  idCard: "",
  emailStatus: 17,
  identityStatus: 24,
});

const { user } = useBaseStore();
const { info } = storeToRefs(user);

const setForm = () => {
  for (const item in form) form[item] = info.value?.[item] || "";

  for (const item in userInfo) userInfo[item] = info.value?.[item] || "";
};

const genderOptions = ref([
  { value: 13, label: "男性" },
  { value: 14, label: "女性" },
]);

watch(info, () => {
  setForm();
});

onMounted(() => {
  setForm();
});

const emailStatusColor: any = reactive({
  17: "text-red-400",
  18: "text-amber-500",
  19: "text-red-400",
  20: "text-green-400",
});
const emailColor = computed(() => {
  return emailStatusColor[userInfo.emailStatus];
});

const identityStatusColor: any = {
  24: "text-red-400",
  21: "text-amber-500",
  22: "text-red-400",
  23: "text-green-400",
};
const identityColor = computed(() => {
  return identityStatusColor[userInfo.identityStatus];
});
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between sticky">
      <div class="flex">
        <div
          class="lg:hidden mr-2 flex items-center cursor-pointer"
          @click="$router.go(-1)"
        >
          <UnoIcon class="i-ic-round-arrow-back-ios text-sm lg:text-base" />
        </div>
        <h1 class="text-lg lg:text-xl font-bold">帳號管理</h1>
      </div>
      <div
        class="group rounded-full cursor-pointer bg-green-500 text-white text-sm font-bold px-4 h-8 leading-8 flex items-center"
        @click="user.update(form)"
      >
        <span class="pr-1 duration-150"> 保存 </span>
        <UnoIcon class="i-ic-baseline-save-alt" />
      </div>
    </div>
    <div class="py-3">
      <UIForm @submit="user.update(form)">
        <div class="flex items-center" />
        <div class="flex items-center space-x-4">
          <UIFormText
            id="firstName"
            v-model="form.firstName"
            label="姓氏"
            class="mb-3 flex-1"
            :require="true"
            placeholder="輸入姓氏"
          />
          <UIFormText
            id="lastName"
            v-model="form.lastName"
            label="名字"
            class="mb-3 flex-1"
            placeholder="輸入名字"
          />
        </div>
        <UIFormText
          id="phone"
          label="手機號碼"
          class="mb-3"
          :value="userInfo.phone"
          :disabled="true"
        >
          <!-- <template #label>
            <NuxtLink
              to="/my/account/change-phone"
              class="font-bold ml-3 text-blue-400"
            >
              修改
            </NuxtLink>
          </template> -->
        </UIFormText>
        <UIFormText
          id="password"
          label="密碼"
          class="mb-3"
          value="***********"
          :disabled="true"
        >
          <template #label>
            <NuxtLink
              to="/my/account/reset-password"
              class="font-bold ml-3 text-blue-400"
            >
              修改
            </NuxtLink>
          </template>
        </UIFormText>
        <UIFormText
          id="email"
          label="信箱"
          class="mb-3"
          :value="userInfo.email"
          :disabled="true"
        >
          <template #label>
            <div :class="emailColor">
              <div
                v-if="info?.emailStatus === 20"
                class="flex items-center font-bold ml-3 space-x-1"
              >
                <UnoIcon class="i-ion-checkmark-circled" />
                已綁定
              </div>
              <div
                v-else-if="info?.emailStatus === 17"
                class="flex items-center font-bold ml-3 space-x-1"
              >
                <UnoIcon class="i-ion-information-circle" />
                未綁定
              </div>
              <div
                v-else-if="info?.emailStatus === 18"
                class="flex items-center font-bold ml-3 space-x-1"
              >
                <UnoIcon class="i-ion-navigate-circle" />
                驗證中
              </div>
            </div>
            <NuxtLink
              to="/my/account/email-binding"
              class="font-bold ml-3 text-blue-400"
            >
              {{ info?.emailStatus === 17 ? "去綁定" : "修改" }}
            </NuxtLink>
          </template>
        </UIFormText>
        <UIFormText
          id="password"
          label="身分證/護照"
          class="mb-3"
          :value="userInfo.idCard"
          :disabled="true"
        >
          <template #label>
            <div
              v-show="info?.identityStatus === 23"
              class="flex items-center font-bold ml-3 text-green-400 space-x-1"
            >
              <UnoIcon class="i-ion-checkmark-circled" />
              已驗證
            </div>
            <NuxtLink
              v-show="info?.identityStatus !== 23"
              to="/my/account/identity-verify"
              :class="identityColor"
              class="flex items-center font-bold ml-3 space-x-1"
            >
              <template v-if="info?.identityStatus === 24">
                <UnoIcon class="i-ion-checkmark-circled" />
                未驗證
                <span class="text-blue-400 pl-1">去驗證</span>
              </template>
              <template v-else-if="info?.identityStatus === 21">
                <UnoIcon class="i-ion-navigate-circle" />
                審核中
                <span class="text-blue-400 pl-1">修改</span>
              </template>
              <template v-else-if="info?.identityStatus === 22">
                <UnoIcon class="i-ion-close-circle" />
                未通過
                <span>: {{ info?.rejectReason }}</span>
                <span class="text-blue-400 pl-1">重新驗證</span>
              </template>
            </NuxtLink>
          </template>
        </UIFormText>
        <UIFormDate
          id="birthday"
          v-model="form.birthday"
          label="生日"
          class="mb-3"
        />
        <UIFormRadio
          v-model="form.gender"
          :border="true"
          class="mb-3"
          label="性別"
          :options="genderOptions"
        />
        <UIFormEditor
          v-model="form.intro"
          placeholder="介紹一下自己吧~"
          class="mb-3"
          label="簡介"
        />
      </UIForm>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ql-editor) {
  min-height: 12em;
}
</style>
