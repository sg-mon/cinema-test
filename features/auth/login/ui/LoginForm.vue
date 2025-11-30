<template>
  <u-form
    :validate
    :state
    class="flex flex-col items-center gap-4 m-auto max-w-96 w-full"
    @submit="onSave">
    <h2 class="h2-style">Вход</h2>
    <u-form-field label="Логин" name="username" class="w-full">
      <u-input v-model="state.username" class="w-full" size="lg" placeholder="Логин"></u-input>
    </u-form-field>
    <u-form-field label="Пароль" name="password" class="w-full">
      <u-input
        v-model="state.password"
        type="password"
        class="w-full"
        size="lg"
        placeholder="Пароль"></u-input>
    </u-form-field>
    <u-button :loading="userStore.loading.login" type="submit"> Войти </u-button>
    <span>
      Если у вас нет аккаунта
      <u-link as="button" to="/register" class="underline">зарегистрируйтесь</u-link>
    </span>
  </u-form>
</template>

<script setup lang="ts">
import type { FormError } from "@nuxt/ui";
import { useUserStore, type TUserTAuthFields } from "~/entities/user";
import { loginValidator, passwordValidator } from "~/shared";

const userStore = useUserStore();
const emit = defineEmits<{
  (e: "success"): void;
  (e: "error"): void;
}>();

const state: TUserTAuthFields = reactive({
  username: "",
  password: "",
});

function validate(state: TUserTAuthFields): FormError[] {
  const errors = [];
  if (!loginValidator(state.username)) {
    errors.push({ name: "username", message: "Логин должен содержать минимум 8 символов" });
  }
  if (!passwordValidator(state.password)) {
    errors.push({
      name: "password",
      message: "Пароль должен содержать минимум 8 символов, цифру и заглавную букву.",
    });
  }
  return errors;
}

async function onSave() {
  const result = await userStore.login(state);
  if (result) {
    emit("success");
  } else {
    emit("error");
  }
}
</script>
