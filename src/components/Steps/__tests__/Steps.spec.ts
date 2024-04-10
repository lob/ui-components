import '@testing-library/jest-dom';
import { render, within } from '@testing-library/vue';

import Steps from '../Steps.vue';

type PropsType = InstanceType<typeof Steps>['$props'];

const DEFAULT_PROPS: PropsType = {
  items: [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]
};

describe('Steps', () => {
  let props: PropsType;

  beforeEach(() => {
    props = { ...DEFAULT_PROPS };
  });

  it('renders', () => {
    const { getByTestId } = render(Steps, { props });

    const steps = getByTestId('uic-steps');
    expect(steps).toBeVisible();
    const { getByText: stepsGetByText } = within(steps);
    expect(stepsGetByText('Step 1')).toBeVisible();
    expect(stepsGetByText('Step 2')).toBeVisible();
    expect(stepsGetByText('Step 3')).toBeVisible();
  });

  it('renders icons with statuses', async () => {
    props = {
      ...props,
      items: [
        { label: 'Step 1', status: 'success' },
        { label: 'Step 2' },
        { label: 'Step 3' }
      ]
    };
    const { findByTestId } = render(Steps, { props });
    expect(await findByTestId('uic-steps-icon')).toBeVisible();
  });
});
