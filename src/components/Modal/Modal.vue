<template>
  <transition name="fade">
    <div
      v-show="modelValue"
      :class="['fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-30']"
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
          v-if="hasHeader"
          id="modalTitle"
          class="flex relative justify-between border-b border-gray-100 pb-4"
        >
          <slot name="header" />
          <close
            aria-label="Close modal"
            class="top-0 right-0 w-3 h-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
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
          v-if="hasFooter"
          class="flex border-t border-gray-100 flex-col pt-4"
        >
          <slot name="footer" />
        </footer>
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
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  computed: {
    hasHeader () {
      return Boolean(this.$slots.header);
    },
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
