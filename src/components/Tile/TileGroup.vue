<template>
  <div class="panel-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineSlots<{
  default(): any;
}>();
</script>

<style scoped lang="scss">
.panel-group {
  @apply flex flex-row basis-0 grow;
  @apply rounded-none;

  & > :deep(*) {
    @apply rounded-none;

    &:not(:last-child) {
      @apply border-r-transparent;
    }
  }

  & > :deep(:first-child) {
    @apply rounded-l-2xl;
  }

  & > :deep(:last-child) {
    @apply rounded-r-2xl;
  }
}
</style>
