<template>
  <button
    :class="[
      'focus-visible:outline-dashed focus-visible:outline-black focus-visible:outline-offset-1 whitespace-nowrap h-min',
      link
        ? `${linkTypeClasses}`
        : 'flex justify-center items-center rounded-full',
      { 'type-xs-700 py-2 px-4 max-h-8': small && !link },
      { 'type-small-700 py-2 px-4 max-h-9': medium && !link },
      { 'type-small-700 py-3 px-5 max-h-11': large && !link },
      { 'type-base-700 py-[14px] px-6 max-h-[52px]': xlarge && !link },
      { 'cursor-not-allowed': disabled },
      {
        'bg-black text-white hover:bg-gray-700 active:bg-gray-800 focus:bg-gray-800':
          primary
      },
      {
        'bg-[#483AC5] text-white hover:bg-[#6C61D1] active:bg-[#483AC5] focus:bg-[#483AC5]':
          upgrade
      },
      {
        'bg-white text-gray-800 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 active:bg-gray-100 focus:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-white':
          secondary
      },
      {
        'bg-gray-50 text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-600 hover:border-gray-400 active:bg-gray-100 active:text-gray-600 active:border-gray-500 focus:bg-gray-100 focus:text-gray-600':
          quiet
      },
      {
        'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-600 active:bg-gray-200 active:text-gray-600 focus:bg-gray-100 focus:text-gray-600':
          ghost
      },
      {
        'disabled:bg-gray-100 disabled:text-gray-300 disabled:border-none':
          primary || quiet || ghost
      },
      {
        'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:bg-red-600 disabled:bg-red-200 disabled:text-red-400':
          danger
      },
      {
        'bg-white text-red-500 border border-red-500 hover:bg-red-50 hover:border-red-600 hover:text-red-600 active:bg-red-100 active:border-red-700 active:text-red-700 focus:bg-red-50 focus:border-red-600 focus:text-red-600 disabled:border-red-300 disabled:text-red-300 disabled:hover:bg-white':
          dangerSecondary
      },
      {
        '!text-blue-600 underline hover:!text-blue-500 disabled:!text-gray-400':
          link
      }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="flex justify-between items-center">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'LobButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return [
          'primary',
          'upgrade',
          'secondary',
          'danger',
          'danger-secondary',
          'quiet',
          'ghost',
          'link'
        ].includes(value);
      }
    },
    size: {
      type: String,
      default: 'large',
      validator: function (value) {
        return ['small', 'medium', 'large', 'xl'].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    small() {
      return this.size === 'small';
    },
    medium() {
      return this.size === 'medium';
    },
    large() {
      return this.size === 'large';
    },
    xlarge() {
      return this.size === 'xl';
    },
    primary() {
      return this.variant === 'primary';
    },
    upgrade() {
      return this.variant === 'upgrade';
    },
    secondary() {
      return this.variant === 'secondary';
    },
    quiet() {
      return this.variant === 'quiet';
    },
    ghost() {
      return this.variant === 'ghost';
    },
    danger() {
      return this.variant === 'danger';
    },
    dangerSecondary() {
      return this.variant === 'danger-secondary';
    },
    link() {
      return this.variant === 'link';
    },
    linkTypeClasses() {
      const size = this.medium ? 'base' : this.size;
      return this.bold ? `type-${size}-800 no-underline` : `type-${size}-600`;
    }
  },
  methods: {
    handleClick($event) {
      this.$emit('click', $event);
    }
  }
};
</script>
