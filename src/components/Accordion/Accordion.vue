<template>
  <button
    id="accordion"
    :class="expanded ? null : 'border-b border-gray-100'"
    class="cursor-pointer flex justify-between min-w-full mb-6 focus:outline-none focus:ring-1 focus:ring-primary-100 focus:border-transparent"
    :aria-expanded="expanded"
    aria-controls="slotContent"
    role="button"
    @click="expanded = !expanded;"
  >
    <h2 class="text-primary-300 py-3 font-light text-lg">
      {{ title }}
    </h2>
    <div
      class="flex-end py-3.5"
    >
      <ChevronRight
        class="w-6 h-6 text-primary-300"
        :class="['transition-transform duration-200 ease-linear -mr-1', {'xl:transform xl:rotate-90': expanded}]"
      />
    </div>
  </button>
  <div
    v-if="expanded"
    id="slotContent"
    role="region"
    aria-labelledby="accordion"
  >
    <slot />
  </div>
</template>

<script>
import ChevronRight from '../Icons/ChevronRight';

export default {
  name: 'Accordion',
  components: { ChevronRight },
  props: {
    title: {
      type: String,
      default: 'Accordion Title'
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expanded: false
    };
  },
  created () {
    this.expanded = this.defaultOpen;
  }
};
</script>
