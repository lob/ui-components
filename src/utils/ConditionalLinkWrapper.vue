<template>
  <ConditionalWrapper
    v-bind="$attrs"
    :tag="linkTag"
    :to="!isExternalLink ? to : undefined"
    :href="to"
    :target="target"
  >
    <slot />
  </ConditionalWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import ConditionalWrapper from './ConditionalWrapper.vue';

const props = withDefaults(
  defineProps<{
    to?: string;
    target?: string;
  }>(),
  {
    to: undefined,
    target: undefined
  }
);

const isExternalLink = computed(() => {
  return props.to && props.to.startsWith('http');
});
const linkTag = computed(() => {
  if (!props.to) {
    return undefined;
  }
  return isExternalLink.value ? 'a' : 'router-link';
});
</script>
