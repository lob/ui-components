import '@testing-library/jest-dom';
import { render, within } from '@testing-library/vue';
import RadioButtonGroup from '../RadioButtonGroup.vue';

describe('RadioButtonGroup', () => {
  it('renders', () => {
    const { getByRole, getByText } = render(RadioButtonGroup, {
      props: { label: 'testing label' }
    });

    expect(getByRole('group')).toBeVisible();
    expect(getByText('testing label')).toBeVisible();
  });

  it('renders required asterisk', () => {
    const { getByText } = render(RadioButtonGroup, {
      props: { label: 'testing label', required: true }
    });

    expect(within(getByText('testing label')).getByText('*')).toBeVisible();
  });

  it('disables', () => {
    const { getByRole } = render(RadioButtonGroup, {
      props: { disabled: true }
    });

    expect(getByRole('group')).toBeDisabled();
  });

  it('hides label', () => {
    const { getByText } = render(RadioButtonGroup, {
      props: { label: 'testing label', hideLabel: true }
    });

    expect(getByText('testing label')).not.toBeVisible();
  });
});
