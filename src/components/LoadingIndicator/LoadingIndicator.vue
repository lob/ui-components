<template>
  <div
    :class="isLoading ? `loading-gif ${loadingClass}` : ''"
    aria-live="polite"
    :aria-busy="isLoading"
    data-testId="loading-indicator"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Comment, computed, defineOptions, defineSlots } from 'vue';

defineOptions({ name: 'LoadingIndicator' });

withDefaults(
  defineProps<{
    loadingClass?: string;
  }>(),
  {
    loadingClass: undefined
  }
);

const slots = defineSlots<{
  default(): any;
}>();

const isLoading = computed(
  () =>
    !slots.default ||
    slots.default().findIndex((o: any) => o.type !== Comment) === -1
);
</script>

<style lang="scss" scoped>
.loading-gif {
  background: transparent
    url(https://s3.us-west-2.amazonaws.com/public.lob.com/sites/spinner-medium.svg)
    no-repeat center;
  background-size: 24px 24px;
  width: 100%;
  height: 50px;
  margin: 0 auto;
}
</style>
