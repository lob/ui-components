<template>
  <div>
    <div
      v-for="size in sizes"
      :key="size"
      class="pb-8"
    >
      <p :class="`tw-text-${size}`">
        text-{{ size }}
      </p>
    </div>
  </div>
</template>

<script>
import { theme } from '../../../tailwind.config';

const { fontSize } = theme;

export default {
  name: 'Theme',
  computed: {
    sizes () {
      return Object.keys(fontSize);
    }
  }
};
</script>
