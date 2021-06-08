<template>
  <div class="left-0 top-0 bg-white fixed w-full rounded">
    <div class="z-30 relative max-w-screen-xl w-full m-0 m-auto py-0 px-6">
      <div
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        role="banner"
        class="py-4 px-3 md:px-6 lg:px-0 flex mx-auto items-center bg-transparent w-auto max-w-none relative justify-between lg:justify-start"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNavbar'
};
</script>
