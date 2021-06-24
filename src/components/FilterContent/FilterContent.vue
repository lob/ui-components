<template>
  <div
    v-if="open"
    ref="container"
    class="absolute z-10 shadow"
  >
    <div
      v-if="hasHeaderContent"
      class="flex items-center px-5 pt-2.5 pb-3 bg-white-200 border-b-2 border-gray-100"
    >
      <chevron-left class="w-4.5 h-4.5 mr-1" />
      <slot
        name="header"
      />
    </div>
    <div
      :class="[
        'px-5 pb-5',
        {'pt-4': hasHeaderContent},
        {'pt-6': !hasHeaderContent}
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { ChevronLeft } from '../Icons';

export default {
  name: 'FilterContent',
  components: { ChevronLeft },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:open'],
  computed: {
    hasHeaderContent () {
      return Boolean(this.$slots.header);
    }
  },
  mounted () {
    window.addEventListener('click', this.onClickOutside);
  },
  unmounted () {
    window.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    onClickOutside ($event) {
      if (typeof this.$refs.container !== 'undefined') {
        const clickOnTheContainer = this.$refs.container === $event.target;
        const clickOnChild = this.$refs.container && this.$refs.container.contains($event.target);

        if (!clickOnTheContainer && !clickOnChild) {
          this.hide();
        }
      }
    },
    hide () {
      this.$emit('update:open', false);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
