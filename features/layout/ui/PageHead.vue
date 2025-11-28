<template>
  <div class="flex justify-center relative mb-8">
    <u-button class="absolute left-0" @click="$router.go(-1)"> Назад </u-button>
    <h2 class="h2-style text-center"><slot></slot></h2>
  </div>
</template>
