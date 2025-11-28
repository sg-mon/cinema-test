<template>
  <u-container>
    <register-form @success="onSuccess"></register-form>
  </u-container>
</template>

<script setup lang="ts">
import { RegisterForm } from "~/features/auth";

const router = useRouter();
const toast = useToast();

function onSuccess() {
  router.push("/profile/booking");
  toast.add({
    title: "Вы успешно авторизовались!",
    color: "success",
  });
}
definePageMeta({
  middleware: ["unauthorized"],
});
useSeoMeta({
  title: "Cinema Test | Регистрация",
});
</script>
