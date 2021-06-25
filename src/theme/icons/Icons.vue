<template>
  <div class="grid grid-cols-7 gap-2 text-black">
    <div
      v-for="icon in icons"
      :key="icon"
      class="p-2"
    >
      <span class="text-xs">{{ icon.name }}</span>
      <component
        :is="icon"
        class="w-6 h-6"
      />
    </div>
  </div>
</template>

<script>
import * as Icons from '@/components/Icons';

export default {
  name: 'Icons',
  components: { ...Icons },
  computed: {
    icons () {
      return Icons;
    }
  }
};
</script>
