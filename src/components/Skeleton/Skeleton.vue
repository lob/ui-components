<template>
  <Skeleton
    :class="`uic-skeleton color-${color}`"
    data-testid="uic-skeleton"
    :height
    :width
  />
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import { SkeletonColor } from './constants';

withDefaults(
  defineProps<{
    color?: SkeletonColor;
    width?: string;
    height?: string;
  }>(),
  {
    color: SkeletonColor.NEUTRAL,
    width: undefined,
    height: undefined
  }
);
</script>

<style>
.uic-skeleton {
  @apply overflow-hidden;
  @apply animate-pulse;
  @apply rounded-lg;

  &.color-error {
    @apply bg-error;
  }
  &.color-neutral {
    @apply bg-gray-200;
  }
  &.color-success {
    @apply bg-success;
  }
}
</style>
