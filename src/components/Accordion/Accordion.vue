<template>
  <div
    class="cursor-pointer flex justify-between min-w-full mb-6 t"
    @click="expanded = !expanded"
    :class="expanded ? null : 'border-b-2'"
  >
    <div class="text-primary-500 font-thin text-lg">
      <b>{{ title }}</b>
    </div>
    <div class="flex-end">
      <ChevronDown
        v-if="expanded"
        class="w-6 h-6"
      />
      <ChevronRight
        v-else
        class="w-6 h-6"
      />
    </div>
  </div>
  <div
    v-if="expanded"
  >
    <slot />
  </div>
</template>

<script>
import ChevronRight from '../Icons/ChevronRight';
import ChevronDown from '../Icons/ChevronDown';

export default {
  name: 'Accordion',
  components: { ChevronRight, ChevronDown },
  props: {
    title: {
      type: String,
      default: 'Accordion Title'
    }
  },
  data () {
    return {
      expanded: false
    };
  }

};
</script>
