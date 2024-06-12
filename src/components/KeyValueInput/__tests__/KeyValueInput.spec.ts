import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import KeyValueInput from '../KeyValueInput.vue';

const DEFAULT_PROPS: InstanceType<typeof KeyValueInput>['$props'] = {
  label: 'Test label',
  modelValue: [['', '']]
};

describe('KeyValueInput', () => {
  it('renders', () => {
    const { getByTestId } = render(KeyValueInput, { props: DEFAULT_PROPS });
    expect(getByTestId('uic-key-value-input')).toBeVisible();
    expect(getByTestId('uic-key-value-input-key-0')).toBeVisible();
    expect(getByTestId('uic-key-value-input-value-0')).toBeVisible();
    expect(getByTestId('uic-key-value-input-delete-0')).toBeVisible();
    expect(getByTestId('uic-key-value-add-button')).toBeVisible();
  });
});
