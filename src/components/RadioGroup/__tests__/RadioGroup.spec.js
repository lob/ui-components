import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import RadioGroup from '../RadioGroup.vue';

const initialProps = {
  legend: 'legend',
  srOnlyLegend: true
};

describe('Radio Group', () => {

  it('renders a legend for accessibility', () => {
    const props = initialProps;
    const { queryByText } = render(RadioGroup, {
      props
    });

    const legend = queryByText(props.legend);
    expect(legend).toBeInTheDocument();
  });

});
