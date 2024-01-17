<template>
  <span
    :class="[
      { 'text-gray-900 hover:text-primary-300': !disabled },
      { 'text-gray-100 hover:text-gray-100': disabled },
    ]"
  >
    <chevrons-left v-if="first" />
    <chevron-left v-if="previous" />
    <chevron-right v-if="next" />
    <chevrons-right v-if="last" />
  </span>
</template>

<script>
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "@/components/Icons";

export default {
  name: "PageArrowIcon",
  components: { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    first: {
      type: Boolean,
      default: false,
    },
    previous: {
      type: Boolean,
      default: false,
    },
    next: {
      type: Boolean,
      default: false,
    },
    last: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
