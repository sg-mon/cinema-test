<template>
  <main class="flex relative">
    <u-navigation-menu
      :items="layoutModule.menu"
      orientation="vertical"
      class="max-w-48 w-full pt-8 sticky left-0 top-0 h-[100vh] shrink-0 menu">
      <template #item="{ item }">
        <div @click="onItemClick(item)" class="w-full h-full text-left">{{ item.label }}</div>
      </template>
    </u-navigation-menu>

    <section class="p-8 grow flex flex-col">
      <slot></slot>
    </section>
    <logout-modal ref="logoutModalRef"></logout-modal>
  </main>
</template>

<script setup lang="ts">
import { useLayoutModule } from "~/features/layout";
import { LogoutModal } from "~/features/auth";

const layoutModule = useLayoutModule();

const logoutModalRef = ref();

function onItemClick(item: { name?: string }) {
  if (item.name === "logout") {
    logoutModalRef.value.openModal?.();
  }
}
</script>

<style>
.menu {
  background-color: var(--ui-bg);
}
</style>
