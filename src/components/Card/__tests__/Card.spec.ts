import '@testing-library/jest-dom';
import { RenderOptions, render } from '@testing-library/vue';
import Card from '../Card.vue';

const renderCard = (options: RenderOptions) => render(Card, { ...options });

describe('Card', () => {
  it('renders with slots', () => {
    const TITLE = 'test card title' as const;
    const CONTENT = 'Hello, this is a card.' as const;
    const { getByText } = renderCard({
      slots: { title: TITLE, default: CONTENT }
    });

    expect(getByText(TITLE)).toBeVisible();
    expect(getByText(CONTENT)).toBeVisible();
  });

  it('renders with props', () => {
    const TITLE = 'test card title' as const;
    const CONTENT = 'test card content' as const;
    const { getByText } = renderCard({
      props: { title: TITLE, content: CONTENT }
    });

    expect(getByText(TITLE)).toBeVisible();
    expect(getByText(CONTENT)).toBeVisible();
  });
});
