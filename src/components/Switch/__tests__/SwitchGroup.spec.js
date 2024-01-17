import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import SwitchGroup from "../SwitchGroup.vue";

const initialProps = {
  legend: "legend",
  srOnlyLegend: true,
};

describe("Switch Group", () => {
  it("renders a legend for accessibility", () => {
    const props = initialProps;
    const { queryByText } = render(SwitchGroup, {
      props,
    });

    const legend = queryByText(props.legend);
    expect(legend).toBeInTheDocument();
  });
});
