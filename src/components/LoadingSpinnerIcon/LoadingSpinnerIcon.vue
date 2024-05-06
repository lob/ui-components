<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 102 102"
    fill="none"
  >
    <path
      d="M102 51C102 79.1665 79.1665 102 51 102C22.8335 102 0 79.1665 0 51C0 22.8335 22.8335 0 51 0C79.1665 0 102 22.8335 102 51ZM8.98351 51C8.98351 74.2051 27.7949 93.0165 51 93.0165C74.2051 93.0165 93.0165 74.2051 93.0165 51C93.0165 27.7949 74.2051 8.98351 51 8.98351C27.7949 8.98351 8.98351 27.7949 8.98351 51Z"
      fill="transparent"
    />
    <path
      class="rotate"
      d="M51 4.49176C51 2.01103 53.0149 -0.0205317 55.486 0.197675C60.6458 0.653305 65.7151 1.89319 70.5169 3.88214C76.7045 6.44513 82.3267 10.2018 87.0624 14.9376C91.7982 19.6733 95.5549 25.2955 98.1179 31.4832C100.107 36.2849 101.347 41.3542 101.802 46.514C102.021 48.9851 99.989 51 97.5082 51C95.0275 51 93.0413 48.9833 92.7766 46.5168C92.3496 42.5378 91.3555 38.6324 89.8182 34.921C87.7066 29.8233 84.6117 25.1915 80.7101 21.2899C76.8086 17.3883 72.1767 14.2934 67.079 12.1818C63.3676 10.6445 59.4622 9.65039 55.4832 9.22338C53.0167 8.95868 51 6.97249 51 4.49176Z"
      fill="url(#paint0_linear_330_5340)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_330_5340"
        x1="51"
        y1="0"
        x2="51.7892"
        y2="51.7655"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#9F94FF" />
        <stop offset="1" stop-color="#FA6A8C" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size: number;
  }>(),
  {
    size: 16
  }
);
</script>

<style scoped lang="scss">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.rotate {
  animation: rotate 1s linear infinite;
  -webkit-animation: rotate 1s linear infinite;
  transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
}

svg {
  display: inherit;
}
</style>
