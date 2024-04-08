<template>
  <component :is="tag" v-if="tag">
    <slot />
  </component>
  <slot v-else />
</template>

<script setup lang="ts">
defineProps<{
  tag?: string;
}>();
</script>
