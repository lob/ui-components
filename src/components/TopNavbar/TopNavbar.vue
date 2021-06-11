<template>
  <div class="left-0 top-0 bg-white fixed w-full rounded">
    <nav
      class="z-30 max-w-7xl w-full m-0 m-auto py-4 px-9 md:px-12 lg:px-6 md:flex mx-auto items-center bg-transparent w-auto max-w-none relative justify-between lg:justify-start"
    >
      <slot></slot>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TopNavbar'
};
</script>
