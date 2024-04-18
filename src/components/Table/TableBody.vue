<template>
  <tbody>
    <slot />
  </tbody>
</template>

<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({ name: 'TableBody' });
</script>
