<template>
  <div>
    <div
      v-for="size in sizes"
      :key="size"
      class="pb-8"
    >
      <p :class="sizeClassName(size)">
        text-{{ size }}
      </p>
    </div>
  </div>
</template>

<script>
import { theme } from '../../../tailwind.config';

const { fontSize } = theme;

export default {
  name: 'FontSizes',
  computed: {
    sizes () {
      return Object.keys(fontSize);
    }
  },
  methods: {
    sizeClassName (size) {
      return `tw-text-${size}`;
    }
  }
};
</script>
