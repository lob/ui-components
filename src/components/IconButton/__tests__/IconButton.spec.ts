import '@testing-library/jest-dom';
import { IconName } from '@/main';
import { render } from '@testing-library/vue';

import IconButton from '../IconButton.vue';

describe('IconButton', () => {
  it('renders', () => {
    const { getByTestId } = render(IconButton, {
      props: { icon: IconName.APP_WINDOWS }
    });
    expect(getByTestId('uic-icon-button')).toBeVisible();
  });

  it('emits click', () => {
    const { getByTestId, emitted } = render(IconButton, {
      props: { icon: IconName.APP_WINDOWS }
    });
    getByTestId('uic-icon-button').click();
    expect(emitted()).toHaveProperty('click');
  });
});
