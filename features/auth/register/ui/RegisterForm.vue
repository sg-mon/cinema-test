<template>
  <u-form
    :validate
    :state
    class="flex flex-col items-center gap-4 m-auto max-w-96 w-full"
    @submit="onSave">
    <h2 class="h2-style">Регистрация</h2>
    <u-form-field label="Логин" name="username" class="w-full">
      <u-input v-model="state.username" class="w-full" size="lg"></u-input>
    </u-form-field>
    <u-form-field label="Пароль" name="password" class="w-full">
      <u-input v-model="state.password" type="password" class="w-full" size="lg"></u-input>
    </u-form-field>
    <u-form-field label="Повторите пароль" name="repeatPassword" class="w-full">
      <u-input v-model="state.repeatPassword" type="password" class="w-full" size="lg"></u-input>
    </u-form-field>
    <u-button :loading="userStore.loading.register" type="submit"> Зарегистрироваться </u-button>
    <span>
      Если вы уже зарегистрированы
      <u-link as="button" to="/login" class="underline">войдите</u-link>
    </span>
  </u-form>
</template>

<script setup lang="ts">
import type { FormError } from "@nuxt/ui";
import { useUserStore, type TUserTAuthFields } from "~/entities/user";
import { loginValidator, passwordValidator } from "~/shared";

const emit = defineEmits<{
  (e: "success"): void;
  (e: "error"): void;
}>();
const userStore = useUserStore();
const state: TUserTAuthFields & { repeatPassword: string } = reactive({
  username: "",
  password: "",
  repeatPassword: "",
});
type TState = typeof state;

function validate(state: TState): FormError[] {
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
  if (!state.repeatPassword || state.password !== state.repeatPassword) {
    errors.push({ name: "repeatPassword", message: "Пароли не совпадают" });
  }
  return errors;
}

async function onSave() {
  const result = await userStore.register(state);
  if (result) {
    emit("success");
  } else {
    emit("error");
  }
}
</script>
