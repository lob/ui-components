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
    <div v-bind="contentProps">
      <slot />
    </div>
  </OverlayPanel>
</template>

<script setup lang="ts">
import OverlayPanel from 'primevue/overlaypanel';
import { HTMLAttributes, ref } from 'vue';

const overlay = ref();

withDefaults(
  defineProps<{
    contentProps?: HTMLAttributes;
  }>(),
  {
    contentProps: () => ({})
  }
);

defineExpose({
  toggle: (e: Event) => overlay.value.toggle(e)
});
</script>

<style lang="scss">
.uic-overlay {
  @apply my-1;
  @apply border border-gray-100 rounded-lg;
  @apply bg-white;
  @apply shadow-large;
}
</style>
