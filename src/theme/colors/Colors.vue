<template>
  <div>
    <div
      v-for="color in Object.keys(themeColors)"
      :key="color"
      class="pb-8"
    >
      <h1
        :class="`text-${color}`"
      >
        {{ color }}
      </h1>

      <template
        v-if="typeof themeColors[color] === 'object'"
      >
        <div
          v-for="nestedColor in Object.keys(themeColors[color])"
          :key="nestedColor"
        >
          <h1
            v-if="typeof themeColors[color][nestedColor] === 'string' && nestedColor !== 'DEFAULT'"
            :class="`text-${color}-${nestedColor}`"
          >
            {{ color }}-{{ nestedColor }} ({{ theme.colors[color][nestedColor].toUpperCase() }})
          </h1>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { config } from 'tailwind-plugin-lob';

const { theme } = config;
const { colors } = theme;

export default {
  name: 'Theme',
  computed: {
    themeColors () {
      return colors;
    },
    theme () {
      console.log(theme);
      return theme;
    }
  }
};
</script>
