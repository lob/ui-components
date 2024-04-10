import '@testing-library/jest-dom';
import ConditionalWrapper from '../ConditionalWrapper.vue';
import { render } from '@testing-library/vue';

type PropsType = InstanceType<typeof ConditionalWrapper>['$props'] &
  Record<string, unknown>;

const DEFAULT_SLOT = '<p data-testid="conditional-wrapper-slot"></p>' as const;

describe('ConditionalWrapper', () => {
  let props: PropsType;

  beforeEach(() => {
    props = {};
  });

  it('renders wrapper when provided', () => {
    props = {
      tag: 'h2',
      'data-testid': 'conditional-wrapper'
    };
    const { getByTestId } = render(ConditionalWrapper, {
      props,
      slots: { default: DEFAULT_SLOT }
    });
    expect(getByTestId('conditional-wrapper')).toBeVisible();
    expect(getByTestId('conditional-wrapper').tagName).toBe('H2');
    expect(getByTestId('conditional-wrapper-slot')).toBeVisible();
  });

  it('does not render wrapper when not provided', () => {
    const { getByTestId, queryByRole } = render(ConditionalWrapper, {
      props,
      slots: { default: DEFAULT_SLOT }
    });
    expect(queryByRole('h2')).toBeFalsy();
    expect(getByTestId('conditional-wrapper-slot')).toBeVisible();
  });
});
