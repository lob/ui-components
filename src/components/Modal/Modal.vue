<template>
  <div
    :class="[{'hidden': !modelValue}, 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-30']"
    @click="closeModal"
  >
    <div
      class="bg-white flex flex-col overflow-x-auto shadow rounded-lg p-5"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
      @click.stop
    >
      <header
        id="modalTitle"
        class="flex relative justify-between border-b border-gray-100 pb-4"
        v-if="!noHeader"
      >
        <slot name="header">
          Default title
        </slot>
        <close
          aria-label="Close modal"
          class="top-0 right-0 w-3 h-3 cursor-pointer"
          tabindex="0"
          role="button"
          @click="closeModal"
          @keyup.enter="closeModal"
        />
      </header>

      <section
        id="modalDescription"
        class="relative py-5"
      >
        <slot name="body">
          Default body
        </slot>
      </section>

      <footer 
        class="flex border-t border-gray-100 flex-col pt-4" 
        v-if="!noFooter"
      >
        <slot name="footer">
          Default footer
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import Close from '../Icons/Close';
export default {
  name: 'Modal',
  components: { Close },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    noFooter: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  methods: {
    closeModal () {
      this.$emit('close');
    }
  }
};
</script>
