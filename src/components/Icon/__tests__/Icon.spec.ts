import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import Icon from '../Icon.vue';
import { IconName } from '../types';

describe('Icon', () => {
  [...Object.values(IconName)].forEach((iconName) => {
    it(`renders ${iconName} icon`, async () => {
      const { findByTestId } = render(Icon, {
        props: {
          icon: iconName
        }
      });
      expect(await findByTestId('uic-icon')).toBeVisible();
    });
  });
});
