import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import LobLabel from '../Label.vue';

const initialProps = {
  id: 'test',
  label: 'test',
  labelFor: 'test'
};

describe('LobLabel', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { getByText } = render(LobLabel, { props });

    const label = getByText(props.label);
    expect(label).toBeInTheDocument();
  });

  it('shows the asterisk when the required prop is true', () => {
    const props = {
      ...initialProps,
      required: true
    };

    const { getByText } = render(LobLabel, { props  });
    const label = getByText(props.label);
    const asterisk = getByText('*');
    expect(label).toContainElement(asterisk);
  });

  describe('if a tooltip is added', () => {

    it('the tooltip shows on the left by default', () => {
      const props = { ...initialProps, tooltipContent: 'magic tooltip' };
      const { getByText, getByTestId } = render(LobLabel, { props });

      const tooltip = getByTestId('tooltip-leading');
      expect(tooltip).toBeInTheDocument();
      const label = getByText(props.label);
      expect(label.parentElement).not.toHaveClass('justify-between');
    });

    it('the tooltip shows on the right if tooltipPosition:trailing is added', () => {
      const props = { ...initialProps, tooltipContent: 'magic tooltip', tooltipPosition: 'trailing' };
      const { getByText, getByTestId } = render(LobLabel, { props });

      const tooltip = getByTestId('tooltip-trailing');
      expect(tooltip).toBeInTheDocument();
      const label = getByText(props.label);
      expect(label.parentElement).toHaveClass('justify-between');
    });

  });

});

