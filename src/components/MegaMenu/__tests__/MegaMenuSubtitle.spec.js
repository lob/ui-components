import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import MegaMenuSubtitle from '../MegaMenuSubtitle.vue';

let slots;

const renderComponent = (options) => render(MegaMenuSubtitle, { ...options });

describe('MegaMenuSubtitle', () => {

  it('renders correctly', () => {
    const slotContent = 'This is the subtitle.';
    slots = { default: slotContent };
    const { queryByText } = renderComponent({ slots });

    const subtitleContent = queryByText(slotContent);
    expect(subtitleContent).toBeInTheDocument();
  });

});
