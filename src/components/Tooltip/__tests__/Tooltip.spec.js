import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import Tooltip from '../Tooltip.vue';

const slots = {
  content: 'Tooltip content',
  trigger: 'I trigger the tooltip on hover'
};

describe('Tooltip', () => {

  it('renders correctly', () => {
    const { queryByText } = render(Tooltip, {
      slots
    });

    const tooltip = queryByText(slots.content);
    const trigger = queryByText(slots.trigger);
    expect(tooltip).toBeInTheDocument();
    expect(trigger).toBeInTheDocument();
  });

  it('fires the mouseover event when the container is moused over', async () => {
    const { queryByText, emitted } = render(Tooltip, {
      slots
    });

    const trigger = queryByText(slots.trigger);

    await fireEvent.mouseOver(trigger);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('mouseover');
  });

  it('fires the mouseleave event when the container the mouse leaves', async () => {
    const { queryByText, emitted } = render(Tooltip, {
      slots
    });

    const trigger = queryByText(slots.trigger);

    await fireEvent.mouseLeave(trigger);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('mouseleave');
  });

});
