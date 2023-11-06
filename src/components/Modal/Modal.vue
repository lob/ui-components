<template>
  <transition name="fade">
    <div
      v-show="visible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-30"
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
        :class="[
          'relative bg-white flex flex-col overflow-y-auto shadow rounded-lg max-h-5/6', paddingClass
        ]"
        @mousedown.stop
      >
        <header
          v-if="header"
          id="header"
          :class="['pb-4', {'border-b border-gray-100': !noSectionDividers}]"
        >
          <h1 class="pageheading">{{ header }}</h1>
          <h2 v-if="subheader" class="text-default">{{ subheader }}</h2>
        </header>
        <section
          id="modalDescription"
          :class="paddingClass"
        >
          <slot />
        </section>
        <footer
          v-if="hasFooter"
          :class="['flex flex-col pt-4', {'border-t border-gray-100': !noSectionDividers}]"
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
          <XmarkLarge />
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import XmarkLarge from '../Icons/XmarkLarge';
export default {
  name: 'Modal',
  components: { XmarkLarge },
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
      default: null
    },
    subheader: {
      type: String,
      default: null
    },
    closeButtonAriaLabel: {
      type: String,
      required: true
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    noSectionDividers: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  computed: {
    hasFooter () {
      return Boolean(this.$slots.footer);
    },
    paddingClass () {
      return this.noPadding ? 'p-0' : 'p-7';
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
