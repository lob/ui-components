<template>
  <ConditionalWrapper
    v-bind="$attrs"
    :tag="linkTag"
    :to="!isExternalLink ? to : undefined"
    :href="to"
    :target="target"
    @click="$emit('click', $event)"
  >
    <ConditionalWrapper
      v-bind="$attrs"
      :tag="isButton || disabled ? 'button' : undefined"
      :disabled
      @click="$emit('click', $event)"
    >
      <slot />
    </ConditionalWrapper>
  </ConditionalWrapper>
</template>

<script setup lang="ts">
import ConditionalWrapper from './ConditionalWrapper.vue';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    to?: string;
    target?: string;
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void; // eslint-disable-line no-unused-vars
  }>(),
  {
    to: undefined,
    target: undefined,
    disabled: false,
    onClick: undefined
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void; // eslint-disable-line no-unused-vars
}>();

const isLink = computed(() => Boolean(props.to) && !props.disabled);
const isExternalLink = computed(
  () => isLink.value && props.to?.startsWith('http')
);
const linkTag = computed(() => {
  if (!isLink.value) {
    return undefined;
  }
  return isExternalLink.value ? 'a' : 'router-link';
});
const isButton = computed(() => !isLink.value && props.onClick);
</script>
