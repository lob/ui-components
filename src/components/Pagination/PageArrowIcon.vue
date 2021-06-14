<template>
  <span :class="[{'text-gray-900 hover:text-primary-300': !disabled}, { 'text-gray-100 hover:text-gray-100' : disabled }]">
    <skip-to-left
      v-if="first"
      class="w-6 h-6"
    />
    <chevron-left
      v-if="previous"
      class="w-6 h-6"
    />
    <chevron-right
      v-if="next"
      class="w-6 h-6"
    />
    <skip-to-right
      v-if="last"
      class="w-6 h-6"
    />
  </span>
</template>

<script>
import { SkipToLeft, ChevronLeft, ChevronRight, SkipToRight }  from '../Icons';

export default {
  name: 'PageArrowIcon',
  components: { SkipToLeft, ChevronLeft, ChevronRight, SkipToRight },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    first: {
      type: Boolean,
      default: false
    },
    previous: {
      type: Boolean,
      default: false
    },
    next: {
      type: Boolean,
      default: false
    },
    last: {
      type: Boolean,
      default: false
    }
  }
};
</script>

