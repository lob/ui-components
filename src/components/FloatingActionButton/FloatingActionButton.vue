<template>
  <div class="fixed bottom-6 w-full flex justify-center">
    <div
      class="p-4 -translate-x-1/2 flex justify-between drop-shadow-xl bg-white rounded-xl items-center border-gray-100 border"
    >
      <span class="pr-8">{{ labelText }}</span>
      <Button :variant="buttonVariant" size="medium" @click="emits('click')">
        {{ buttonText }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue'; // Adjust the path according to your project structure
withDefaults(
  defineProps<{
    labelText?: string;
    buttonVariant?: keyof (typeof Button)['variants'];
    buttonText?: string;
  }>(),
  {
    labelText: '',
    buttonVariant: 'primary',
    buttonText: ''
  }
);

const emits = defineEmits<{
  (e: 'click'): void; // eslint-disable-line no-unused-vars
}>();
</script>
