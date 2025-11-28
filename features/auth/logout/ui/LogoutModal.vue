<template>
  <u-modal title="Вы уверены, что хотите выйти?" v-model:open="isModalVisible">
    <template #footer>
      <div class="flex gap-2">
        <u-button label="Выйти" color="error" @click="logout"></u-button>
        <u-button color="info" label="Закрыть" @click="closeModal"></u-button>
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import { useUserStore } from "~/entities/user";

const userStore = useUserStore();

const isModalVisible = ref(false);
function logout() {
  userStore.logout();
  isModalVisible.value = false;
}
function closeModal() {
  isModalVisible.value = false;
}
function openModal() {
  isModalVisible.value = true;
}

defineExpose({
  openModal,
});
</script>
