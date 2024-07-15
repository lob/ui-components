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
    @show="$emit('show')"
    @hide="$emit('hide')"
  >
    <div v-bind="contentProps">
      <slot />
    </div>
  </OverlayPanel>
</template>

<script setup lang="ts">
import OverlayPanel from 'primevue/overlaypanel';
import { HTMLAttributes, ref } from 'vue';

const overlay = ref<InstanceType<typeof OverlayPanel>>();

withDefaults(
  defineProps<{
    contentProps?: HTMLAttributes;
  }>(),
  {
    contentProps: () => ({})
  }
);

defineEmits<{
  (e: 'hide'): void; // eslint-disable-line no-unused-vars
  (e: 'show'): void; // eslint-disable-line no-unused-vars
}>();

defineExpose({
  hide: () => overlay.value?.hide(),
  show: (e: Event) => overlay.value?.show(e),
  toggle: (e: Event) => overlay.value?.toggle(e)
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
