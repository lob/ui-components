<template>
  <div
    v-if="open"
    ref="container"
    data-testId="container"
    class="absolute z-20 shadow bg-white"
  >
    <div
      v-if="hasHeaderContent"
      class="flex items-center px-5 pt-2.5 pb-3 bg-white-200 border-b-2 border-gray-100"
    >
      <slot name="header" />
    </div>
    <div
      :class="[
        'px-5 pb-5',
        { 'pt-4': hasHeaderContent },
        { 'pt-6': !hasHeaderContent }
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import mitt from 'mitt';

const emitter = mitt();

const FILTER_OPEN_EVENT = 'filter-open';

export default {
  name: 'FilterContent',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    boundElement: {
      type: Object,
      default: null
    }
  },
  emits: ['update:open'],
  computed: {
    hasHeaderContent() {
      return Boolean(this.$slots.header);
    }
  },
  created() {
    emitter.on(FILTER_OPEN_EVENT, this.handleOtherFilterOpened);
  },
  mounted() {
    window.addEventListener('click', this.onClickOutside, true);
  },
  unmounted() {
    window.removeEventListener('click', this.onClickOutside);
    emitter.off(FILTER_OPEN_EVENT, this.handleOtherFilterOpened);
  },
  updated() {
    if (this.open) {
      emitter.emit(FILTER_OPEN_EVENT, this.$refs.container);
    }
  },
  methods: {
    handleOtherFilterOpened(filterEl) {
      if (this.$refs.container !== filterEl) {
        this.hide();
      }
    },
    onClickOutside($event) {
      if (this.$refs.container) {
        const clickOnTheContainer = this.$refs.container === $event.target;
        const clickOnChild =
          this.$refs.container && this.$refs.container.contains($event.target);

        const clickToOpenElement =
          this.boundElement && (this.boundElement.$el || this.boundElement);
        const clickOnBoundElement =
          clickToOpenElement &&
          (clickToOpenElement === $event.target ||
            clickToOpenElement.contains($event.target));

        if (!clickOnTheContainer && !clickOnChild) {
          if (clickOnBoundElement) {
            $event.stopPropagation();
          }
          this.hide($event);
        }
      }
    },
    hide() {
      this.$emit('update:open', false);
    }
  }
};
</script>
