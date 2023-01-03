<template>
  <button class="type-small-700 text-gray-500 whitespace-nowrap h-[76px] px-8 hover:bg-gray-50">
    <div class="flex flex-col justify-center">
      <div class="flex items-center">
        <slot />
        <div class="ml-2">
          <slot name="icon" />
        </div>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'TopNavButton'
};
</script>
