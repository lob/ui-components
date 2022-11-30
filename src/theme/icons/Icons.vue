<template>
  <div class="text-black">
    <div class="grid grid-cols-7 gap-2 text-black">
      <div
        v-for="icon in icons"
        :key="icon"
        class="p-2"
      >
        <div class="text-xs mb-1.5">
          {{ icon.name }}
        </div>
        <component
          :is="icon"
          :size="size"
          :class="`text-${storyOnlyColorClass}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as Icons from '@/components/Icons';

export default {
  name: 'Icons',
  components: { ...Icons },
  props: {
    size: {
      type: String,
      default: 'm',
      validator: function (value) {
        return ['xxl', 'xl', 'l', 'm', 's'].includes(value);
      }
    },
    storyOnlyColorClass: {
      type: String,
      default: 'black'
    }
  },
  computed: {
    icons () {
      return Icons;
    }
  }
};
</script>
