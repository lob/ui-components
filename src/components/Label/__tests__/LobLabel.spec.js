import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import LobLabel from '../LobLabel.vue';

const initialProps = {
  id: 'test',
  label: 'test',
  labelFor: 'test'
};

describe('LobLabel', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { getByText } = render(LobLabel, {
      props
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
      props
    });
    const label = getByText(props.label);
    const asterisk = getByText('*');

    expect(label).toContainElement(asterisk);
  });

});
