<template>
  <button
    :class="[
      link ? `!${linkSizeClass}` : 'flex justify-center items-center rounded-full',
      { 'type-xs-700 py-2 px-4': small },
      { 'type-small-700 py-2 px-4': medium },
      { 'type-small-700 py-3 px-5': large },
      { 'type-base-700 py-[14px] px-6': xlarge },
      { 'cursor-not-allowed pointer-events-none': disabled },
      { 'bg-black text-white hover:bg-gray-700 active:bg-gray-800 focus:bg-gray-800 focus:outline-dashed focus:outline-black focus:outline-offset-1 disabled:bg-gray-200 disabled:text-gray-400' : primary },
      { 'bg-white text-gray-800 border border-gray-800 hover:bg-gray-50 active:bg-gray-100 focus:bg-gray-100 focus:outline-dashed focus:outline-black focus:outline-offset-1 disabled:border-gray-200 disabled:text-gray-400' : secondary },
      { 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:bg-red-600 focus:outline-dashed focus:outline-black focus:outline-offset-1 disabled:bg-red-200 disabled:text-red-400' : danger },
      { 'bg-white text-red-500 border border-red-500 hover:bg-red-50 hover:border-red-600 hover:text-red-600 active:bg-red-100 active:border-red-700 active:text-red-700 focus:bg-red-50 focus:border-red-600 focus:text-red-600 focus:outline-dashed focus:outline-black focus:outline-offset-1 disabled:border-red-300 disabled:text-red-300' : dangerSecondary },
      { '!text-blue-600 underline disabled:!text-gray-400 px-0 py-0': link }
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
        return ['primary', 'secondary', 'danger', 'danger-secondary', 'quiet', 'ghost', 'link'].includes(value);
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
    }
  },
  emits: ['click'],
  computed: {
    primary () {
      return this.variant === 'primary';
    },
    secondary () {
      return this.variant === 'secondary';
    },
    danger () {
      return this.variant === 'danger';
    },
    dangerSecondary () {
      return this.variant === 'danger-secondary';
    },
    link () {
      return this.variant === 'link';
    },
    linkSizeClass () {
      return this.medium ? 'type-base-600' : `type-${this.size}-600`;
    },
    small () {
      return this.size === 'small';
    },
    medium () {
      return this.size === 'medium';
    },
    large () {
      return this.size === 'large';
    },
    xlarge () {
      return this.size === 'xl';
    }
  },
  methods: {
    handleClick ($event) {
      this.$emit('click', $event);
    }
  }
};
</script>
