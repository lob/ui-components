<template>
  <ul class="uic-grid">
    <slot />
  </ul>
</template>

<script setup lang="ts">
defineSlots<{
  default(): any;
}>();
</script>

<style scoped lang="scss">
.uic-grid {
  @apply flex flex-row flex-wrap gap-5 justify-start;
}
</style>
