<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/userStore'

const userStore = useUserStore()

userStore.CheckUserLoggedIn()
</script>
