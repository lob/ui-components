<template>
  <button class="type-small-700 text-gray-500 whitespace-nowrap h-[76px] px-8 hover:bg-gray-50 focus:outline-black focus:outline-dashed active:bg-black active:!text-white">
    <div class="flex flex-col justify-center">
      <div class="flex items-center">
        <slot />
        <div :class="{ 'ml-2': hasIcon }">
          <slot name="icon" />
        </div>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'TopNavButton',
  computed: {
    hasIcon () {
      return Boolean(this.$slots.icon);
    }
  }
};
</script>
