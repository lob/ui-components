<template>
  <div data-testid="uic-key-value-input">
    <fieldset class="w-full">
      <legend class="uic-label">{{ label }}</legend>
      <ul class="flex flex-col gap-4 w-full">
        <li
          v-for="([key, value], index) in modelValue"
          :key="`key-value-${index}`"
          class="grid gap-4 items-start"
          style="grid-template-columns: 1fr 1fr min-content"
        >
          <TextInput
            :id="`key-${index}`"
            :data-testid="`uic-key-value-input-key-${index}`"
            :disabled
            :error="Boolean(keyErrors?.[index])"
            :helper-text="keyErrors?.[index]"
            :label="keyLabel"
            :model-value="key"
            :placeholder="keyPlaceholder"
            sr-only-label
            @update:modelValue="handleKeyChange(index, $event)"
            @blur="$emit('keyBlur', index)"
            @focus="$emit('keyFocus', index)"
            @input="$emit('keyInput', index)"
          />
          <TextInput
            :id="`value-${index}`"
            :data-testid="`uic-key-value-input-value-${index}`"
            :disabled
            :error="Boolean(valueErrors?.[index])"
            :helper-text="valueErrors?.[index]"
            :label="valueLabel"
            :model-value="value"
            :placeholder="valuePlaceholder"
            sr-only-label
            @update:modelValue="handleValueChange(index, $event)"
            @blur="$emit('valueBlur', index)"
            @focus="$emit('valueFocus', index)"
            @input="$emit('valueInput', index)"
          />
          <IconButton
            :data-testid="`uic-key-value-input-delete-${index}`"
            :disabled
            icon="Delete"
            size="lg"
            type="button"
            color="neutral"
            variant="text"
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
    disabled?: boolean;
    /** Errors correspond with the field's index. */
    keyErrors?: Record<number, string>;
    keyLabel?: string;
    keyPlaceholder?: string;
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
    valuePlaceholder?: string;
  }>(),
  {
    addLabel: 'Add field',
    disabled: false,
    keyErrors: undefined,
    keyLabel: 'Key',
    keyPlaceholder: undefined,
    valueErrors: undefined,
    valueLabel: 'Value',
    valuePlaceholder: undefined
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: [string, string][]): void; // eslint-disable-line no-unused-vars
  (e: 'keyFocus', index: number): void; // eslint-disable-line no-unused-vars
  (e: 'valueFocus', index: number): void; // eslint-disable-line no-unused-vars
  (e: 'keyBlur', index: number): void; // eslint-disable-line no-unused-vars
  (e: 'valueBlur', index: number): void; // eslint-disable-line no-unused-vars
  (e: 'keyInput', index: number): void; // eslint-disable-line no-unused-vars
  (e: 'valueInput', index: number): void; // eslint-disable-line no-unused-vars
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
