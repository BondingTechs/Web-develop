<script lang="ts" setup>
import { useBaseStore } from "@/stores";
definePageMeta({
  auth: true,
});

const route: any = useRoute();
const router = useRouter();
const $loading = useState("loading");
const $alert = useState("alert");

const verify = async () => {
  const token = route.query.token || "";
  $loading.value = true;
  const { error, message } = await useHttpFetchPost("/user/email-verify", {
    body: { token },
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
  user.updateField({
    emailStatus: 20,
  });

  return ($alert.value = {
    type: "success",
    title: "驗證成功",
    action: () => router.push("/my/account"),
  });
};

if (!process.server) verify();
</script>

<template>
  <div>
    <div class="flex items-center justify-between sticky">
      <div class="flex items-center space-x-2">
        <h1 class="text-xl font-bold">信箱驗證</h1>
      </div>
    </div>
  </div>
</template>
