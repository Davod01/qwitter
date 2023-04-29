<script setup lang="ts">
</script>

<template>
  <div class="back-gradiant window-height row justify-center items-center">
    <router-view />
  </div>
</template>

<style lang="scss">
.back-gradiant {
  // background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
  background-image: linear-gradient(to left bottom, #9980f6, #8097ff, #70aaff, #70bafd, #80c8f6, #83d0f6, #8ad8f5, #93e0f4, #85e7f7, #76eef8, #69f5f6, #5ffbf1);
}
.purpleStyle {
  color: #FF0080
}
</style>