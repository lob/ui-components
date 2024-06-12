<template>
  <div data-testid="uic-key-value-input">
    <fieldset class="w-full">
      <legend class="uic-label">{{ label }}</legend>
      <ul class="flex flex-col gap-4 w-full">
        <li
          v-for="([key, value], index) in modelValue"
          :key="`key-value-${index}`"
          class="grid gap-6 items-center"
          style="grid-template-columns: 1fr 1fr min-content"
        >
          <TextInput
            :id="`key-${index}`"
            :data-testid="`uic-key-value-input-key-${index}`"
            :error="Boolean(keyErrors?.[index])"
            :helper-text="keyErrors?.[index]"
            :label="keyLabel"
            :model-value="key"
            sr-only-label
            @update:modelValue="handleKeyChange(index, $event)"
          />
          <TextInput
            :id="`value-${index}`"
            :data-testid="`uic-key-value-input-value-${index}`"
            :error="Boolean(valueErrors?.[index])"
            :helper-text="valueErrors?.[index]"
            :label="valueLabel"
            :model-value="value"
            sr-only-label
            @update:modelValue="handleValueChange(index, $event)"
          />
          <IconButton
            :data-testid="`uic-key-value-input-delete-${index}`"
            icon="Delete"
            type="button"
            color="error"
            variant="outlined"
            @click="handleDelete(index)"
          />
        </li>
      </ul>
    </fieldset>

    <Button
      class="mt-2"
      data-testid="uic-key-value-add-button"
      size="medium"
      type="button"
      variant="ghost"
      @click="handleAddField"
    >
      <Icon icon="Plus" class="mr-1" size="sm" />
      {{ addLabel }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue';
import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import TextInput from '@/components/TextInput/TextInput.vue';

const props = withDefaults(
  defineProps<{
    addLabel?: string;
    /** Errors correspond with the field's index. */
    keyErrors?: Record<number, string>;
    keyLabel?: string;
    label: string;
    /**
     * The `modelValue` is typed this way to allow invalid duplicated keys to be
     * shown with errors. To convert this to an object use
     * `Object.fromEntries(...)`
     */
    modelValue: [string, string][];
    /** Errors correspond with the field's index. */
    valueErrors?: Record<number, string>;
    valueLabel?: string;
  }>(),
  {
    addLabel: 'Add field',
    keyErrors: undefined,
    keyLabel: 'Key',
    valueErrors: undefined,
    valueLabel: 'Value'
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: [string, string][]): void; // eslint-disable-line no-unused-vars
}>();

const handleKeyChange = (index: number, newKey: string) => {
  const newModelValue = [...props.modelValue];
  newModelValue[index][0] = newKey;

  emit('update:modelValue', newModelValue);
};

const handleValueChange = (index: number, newValue: string) => {
  const newModelValue = [...props.modelValue];
  newModelValue[index][1] = newValue;

  emit('update:modelValue', newModelValue);
};

const handleAddField = () => {
  emit('update:modelValue', [...props.modelValue, ['', '']]);
};

const handleDelete = (index: number) => {
  const newModelValue = [...props.modelValue];
  newModelValue.splice(index, 1);

  emit('update:modelValue', newModelValue);
};
</script>
