<template>
  <button
    id="accordion"
    :class="expanded ? null : 'border-b border-gray-100'"
    class="cursor-pointer flex justify-between min-w-full mb-6 focus:outline-none focus:ring-1 focus:ring-primary-100 focus:border-transparent"
    :aria-expanded="expanded"
    aria-controls="slotContent"
    role="button"
    @click="expanded = !expanded"
  >
    <h2 class="text-primary-500 py-3 font-light text-lg flex">
      {{ title }}
      <ChevronRight
        class="my-1.5 mx-2"
        :class="['transition-transform duration-200 ease-linear -mr-1', {'xl:transform xl:rotate-90': expanded}]"
      />
    </h2>
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
    defaultOpen: {
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
