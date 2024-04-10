import '@testing-library/jest-dom';
import {
  IconButtonColor,
  IconButtonSize,
  IconButtonVariant,
  IconName
} from '@/main';
import { render } from '@testing-library/vue';

import IconButton from '../IconButton.vue';

describe('IconButton', () => {
  it.each([
    { icon: IconName.APP_WINDOWS, size: IconButtonSize.SM },
    { icon: IconName.APP_WINDOWS, size: IconButtonSize.MD },
    { icon: IconName.APP_WINDOWS, size: IconButtonSize.LG },
    { icon: IconName.APP_WINDOWS, size: IconButtonSize.XL },
    { icon: IconName.APP_WINDOWS, color: IconButtonColor.ERROR },
    { icon: IconName.APP_WINDOWS, color: IconButtonColor.INFO },
    { icon: IconName.APP_WINDOWS, color: IconButtonColor.NEUTRAL },
    { icon: IconName.APP_WINDOWS, color: IconButtonColor.SUCCESS },
    { icon: IconName.APP_WINDOWS, color: IconButtonColor.UPGRADE },
    { icon: IconName.APP_WINDOWS, color: IconButtonColor.WARNING },
    { icon: IconName.APP_WINDOWS, variant: IconButtonVariant.OUTLINED },
    { icon: IconName.APP_WINDOWS, variant: IconButtonVariant.PRIMARY }
  ])('renders', (props) => {
    const { getByTestId } = render(IconButton, {
      props
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
