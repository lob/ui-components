<template>
  <div>
    <div v-for="size in sizes" :key="size" class="mb-6">
      <p :class="`text-${size}`">text-{{ size }}</p>
    </div>
  </div>
</template>

<script>
import { config } from 'tailwind-plugin-lob';

const { theme } = config;
const { fontSize } = theme.extend;

export default {
  name: 'Theme',
  computed: {
    sizes() {
      return Object.keys(fontSize);
    }
  }
};
</script>
