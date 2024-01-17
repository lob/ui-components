<template>
  <div>
    <div v-for="typeClass in typeClasses" :key="typeClass" class="mb-6">
      <p :class="`${typeClass}`">
        {{ typeClass }}
      </p>
    </div>
  </div>
</template>

<script>
const typeClasses = [
  "type-display-1",
  "type-display-2",
  "type-header-1",
  "type-header-2",
  "type-header-3",
  "type-header-4",
  "type-xl-300",
  "type-xl-400",
  "type-xl-500",
  "type-xl-600",
  "type-xl-700",
  "type-xl-800",
  "type-large-300",
  "type-large-400",
  "type-large-500",
  "type-large-600",
  "type-large-700",
  "type-large-800",
  "type-base-300",
  "type-base-400",
  "type-base-500",
  "type-base-600",
  "type-base-700",
  "type-base-800",
  "type-small-300",
  "type-small-400",
  "type-small-500",
  "type-small-600",
  "type-small-700",
  "type-small-800",
  "type-xs-300",
  "type-xs-400",
  "type-xs-500",
  "type-xs-600",
  "type-xs-700",
  "type-xs-800",
];

export default {
  name: "Theme",
  data() {
    return {
      typeClasses,
    };
  },
};
</script>
