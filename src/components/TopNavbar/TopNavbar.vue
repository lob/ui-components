<template>
  <div
    class="left-0 top-0 bg-white sticky w-full rounded z-20 border-b-2 border-white-300"
  >
    <nav
      class="z-30 w-full m-auto px-9 md:px-12 lg:px-6 flex mx-auto items-center bg-transparent max-w-none relative justify-between lg:justify-start"
    >
      <slot />
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TopNavbar'
};
</script>
