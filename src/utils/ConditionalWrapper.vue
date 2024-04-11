<template>
  <component :is="tag" v-if="tag" v-bind="$attrs">
    <slot />
  </component>
  <slot v-else v-bind="$attrs" />
</template>

<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({ inheritAttrs: false });

defineProps<{
  tag?: string;
}>();
</script>
