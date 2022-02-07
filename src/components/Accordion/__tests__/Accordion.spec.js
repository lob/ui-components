import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Accordion from '../Accordion';

const initialProps = {
  title: 'Accordion Title.'
};

const renderComponent = () => render(Accordion);

describe('Accordion', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { queryByText } = renderComponent({ props });

    const title = queryByText('Accordion Title');
    expect(title).toBeInTheDocument();

  });

  it('doesn\'t display accordion content', async () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const slotTag = queryByRole('region');
    expect(slotTag).not.toBeInTheDocument();
  });

  it('displays content when clicked', async () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const title = queryByRole('button');
    await userEvent.click(title);

    const slotTag = queryByRole('region');
    expect(slotTag).toBeInTheDocument();

  });

});
