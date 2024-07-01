import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import LobLabel from '../Label.vue';
import Tooltip from 'primevue/tooltip';

const initialProps = {
  id: 'test',
  label: 'test',
  labelFor: 'test'
};

describe('LobLabel', () => {
  it('renders correctly', () => {
    const props = initialProps;
    const { getByText } = render(LobLabel, {
      props,
      global: { directives: { tooltip: Tooltip } }
    });

    const label = getByText(props.label);
    expect(label).toBeInTheDocument();
  });

  it('shows the asterisk when the required prop is true', () => {
    const props = {
      ...initialProps,
      required: true
    };

    const { getByText } = render(LobLabel, {
      props,
      global: { directives: { tooltip: Tooltip } }
    });
    const label = getByText(props.label);
    const asterisk = getByText('*');
    expect(label).toContainElement(asterisk);
  });

  describe('if a tooltip is added', () => {
    it('the tooltip shows on the left by default', async () => {
      const props = { ...initialProps, tooltipContent: 'magic tooltip' };
      const { findByText, getByTestId } = render(LobLabel, {
        props,
        global: { directives: { tooltip: Tooltip } }
      });

      await fireEvent.mouseEnter(getByTestId('uic-tooltip-icon'));
      expect(await findByText('magic tooltip')).toBeInTheDocument();
      const labelWrapper = getByTestId('labelWrapper');
      expect(labelWrapper).not.toHaveClass('justify-between');
    });

    it('the tooltip shows on the right if tooltipPosition:trailing is added', async () => {
      const props = {
        ...initialProps,
        tooltipContent: 'magic tooltip',
        tooltipPosition: 'trailing'
      };
      const { findByText, getByTestId } = render(LobLabel, {
        props,
        global: { directives: { tooltip: Tooltip } }
      });

      await fireEvent.mouseEnter(getByTestId('uic-tooltip-icon'));
      expect(await findByText('magic tooltip')).toBeInTheDocument();
      const labelWrapper = getByTestId('labelWrapper');
      expect(labelWrapper).toHaveClass('justify-between flex-row-reverse');
    });
  });
});
