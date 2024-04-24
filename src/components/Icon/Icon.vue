<template>
  <!-- eslint-disable vue/no-parsing-error -->
  <component
    :is="Svg"
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="uic-icon"
  />
  <!-- eslint-enable -->
</template>

<script setup lang="ts">
import { Size } from '@/types';
import { computed, defineAsyncComponent, watch } from 'vue';

import { IconName, IconSize } from './types';

// Inspired by https://mkay11.medium.com/heres-a-simple-solution-to-incorporate-inline-svgs-in-vue-vite-da5897a480f7

const props = withDefaults(
  defineProps<{
    icon: IconName;
    size?: keyof typeof IconSize;
    /** When defined `size` prop is ignored. */
    sizeOverride?: number;
  }>(),
  {
    size: Size.MD,
    sizeOverride: undefined
  }
);

const getSvg = () =>
  defineAsyncComponent(
    () => import(`@/components/Icon/svgs/${props.icon}.svg`)
  );

let Svg = getSvg();

watch(
  () => props.icon,
  () => {
    Svg = getSvg();
  }
);

const iconSize = computed(() => props.sizeOverride || IconSize[props.size]);
</script>
