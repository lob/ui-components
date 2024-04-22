<template>
  <OverlayPanel
    ref="overlay"
    class="uic-overlay"
    :pt="{
      transition: {
        enterFromClass: 'opacity-0 scale-[.98]',
        enterActiveClass: 'transition duration-250 ease-out',
        leaveActiveClass: 'transition duration-250 ease-out',
        leaveToClass: 'opacity-0 scale-[.98]'
      }
    }"
  >
    <slot />
  </OverlayPanel>
</template>

<script setup lang="ts">
import OverlayPanel from 'primevue/overlaypanel';
import { ref } from 'vue';

const overlay = ref();

defineExpose({
  toggle: (e: Event) => overlay.value.toggle(e)
});
</script>

<style lang="scss">
.uic-overlay {
  @apply my-1 p-2;
  @apply border border-gray-100 rounded-lg;
  @apply bg-white;
  @apply shadow-lg;
}
</style>
