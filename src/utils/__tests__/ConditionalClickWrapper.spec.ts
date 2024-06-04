import '@testing-library/jest-dom';
import ConditionalClickWrapper from '../ConditionalClickWrapper.vue';
import { render } from '@testing-library/vue';

const DEFAULT_SLOT = '<p data-testid="conditional-wrapper-slot"></p>' as const;

describe('ConditionalClickWrapper', () => {
  it.each([
    { props: { to: '/test' }, expected: 'router-link' },
    { props: { to: 'https://test.com' }, expected: 'a' },
    { props: { to: '/test', disabled: true }, expected: 'button' },
    { props: { to: 'https://test.com', disabled: true }, expected: 'button' },
    { props: { onClick: () => undefined }, expected: 'button' },
    { props: { onClick: () => undefined, disabled: true }, expected: 'button' },
    { props: { disabled: true }, expected: 'button' }
  ])('renders `<$expected />` with props `$props`', ({ props, expected }) => {
    const { getByTestId } = render(ConditionalClickWrapper, {
      props: {
        ...props,
        'data-testid': 'conditional-click-wrapper'
      },
      slots: { default: DEFAULT_SLOT }
    });

    expect(getByTestId('conditional-click-wrapper')).toBeVisible();
    expect(getByTestId('conditional-click-wrapper').tagName.toLowerCase()).toBe(
      expected
    );
    expect(getByTestId('conditional-wrapper-slot')).toBeVisible();
  });

  it.each([
    { props: {} },
    { props: { to: '/test' } },
    { props: { to: 'https://test.com' } }
  ])('emits `click` when clickable with props `$props`', ({ props }) => {
    const { emitted, getByTestId } = render(ConditionalClickWrapper, {
      props: {
        ...props,
        'data-testid': 'conditional-click-wrapper',
        onClick: () => undefined
      },
      slots: { default: DEFAULT_SLOT }
    });
    getByTestId('conditional-click-wrapper').click();
    expect(emitted()).toHaveProperty('click');
  });
});
