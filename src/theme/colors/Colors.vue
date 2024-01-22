<template>
  <div>
    <div v-for="color in Object.keys(themeColors)" :key="color" class="mb-5">
      <div v-if="typeof themeColors[color] !== 'object'">
        <h2 :class="`text-${color}`">
          {{ color }}
        </h2>
      </div>
      <template v-if="typeof themeColors[color] === 'object'">
        <div
          v-for="nestedColor in Object.keys(themeColors[color])"
          :key="nestedColor"
        >
          <h2
            v-if="
              typeof themeColors[color][nestedColor] === 'string' &&
              nestedColor !== 'DEFAULT'
            "
            :class="`text-${color}-${nestedColor}`"
          >
            {{ color }}-{{ nestedColor }} ({{
              theme.colors[color][nestedColor].toUpperCase()
            }})
          </h2>
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
    themeColors() {
      delete colors.transparent;
      delete colors.current;
      return colors;
    },
    theme() {
      return theme;
    }
  }
};
</script>
