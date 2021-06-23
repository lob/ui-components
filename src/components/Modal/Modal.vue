<template>
  <div
    :class="['fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-30',
             {'hidden': !modelValue}]"
    @click="closeModal"
  >
    <div
      class="bg-white flex flex-col overflow-x-auto shadow"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
    >
      <header
        id="modalTitle"
        class="p-4 flex relative justify-between border-b border-gray-100"
      >
        <slot name="header">
          Default title
        </slot>
        <close
          aria-label="Close modal"
          class="top-0 right-0 w-3 h-3 cursor-pointer"
          @click="closeModal"
        />
      </header>

      <section
        id="modalDescription"
        class="relative py-5 px-2.5"
      >
        <slot name="body">
          Default body
        </slot>
      </section>

      <footer class="p-4 flex border-t border-gray-100 flex-col">
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
