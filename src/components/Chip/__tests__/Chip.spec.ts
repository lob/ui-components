import '@testing-library/jest-dom';
import { IconName } from '@/components/Icon';
import { render } from '@testing-library/vue';

import Chip from '../Chip.vue';

describe('Chip', () => {
  it('renders', () => {
    const { getByTestId } = render(Chip, {
      props: { icon: IconName.ENVELOPE }
    });

    expect(getByTestId('uic-chip')).toBeVisible();
  });
});
