<template>
  <transition name="fade">
    <div
      v-show="visible"
      :class="['fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-30']"
      :aria-hidden="!visible"
      @mousedown="closeModal"
      @keydown.esc="closeModal"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="header"
        aria-describedby="modalDescription"
        :style="{'width': width}"
        class="relative bg-white flex flex-col overflow-y-auto shadow rounded-lg p-5 max-h-5/6"
        @mousedown.stop
      >
        <header
          v-if="header"
          id="header"
          class="pageheading border-b border-gray-100 pb-4"
        >
          {{ header }}
        </header>
        <section
          id="modalDescription"
          class="py-5"
        >
          <slot />
        </section>
        <footer
          v-if="hasFooter"
          class="flex border-t border-gray-100 flex-col pt-4"
        >
          <slot name="footer" />
        </footer>
        <button
          :class="['absolute top-6 right-4 rounded-full w-7 h-7 p-1 cursor-pointer hover:bg-white-200',
                   'focus:outline-none focus:ring-2 focus:ring-primary-100']"
          :aria-label="closeButtonAriaLabel"
          @click="closeModal"
          @keyup.enter="closeModal"
        >
          <Close class="w-5 h-5" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import Close from '../Icons/Close';
export default {
  name: 'Modal',
  components: { Close },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      required: true
    },
    closeButtonAriaLabel: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
  computed: {
    hasFooter () {
      return Boolean(this.$slots.footer);
    }
  },
  methods: {
    closeModal () {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
