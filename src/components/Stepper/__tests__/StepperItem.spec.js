import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import StepperItem from "../StepperItem.vue";

const renderComponent = (options) => {
  const result = render(StepperItem, {
    ...options,
  });
  return result;
};

describe("StepperItem", () => {
  it("renders as a middle step with center alignment by default", async () => {
    const { container } = renderComponent({});

    const item = container.querySelector(".items-center");
    expect(item).toBeInTheDocument();

    let noItem = container.querySelector(".half-border-left");
    expect(noItem).not.toBeInTheDocument();

    noItem = container.querySelector(".half-border-right");
    expect(noItem).not.toBeInTheDocument();
  });

  it("renders half a right border when it is center alignment and the first item of the stepper", async () => {
    const props = {
      position: "first",
    };
    const { container } = renderComponent({ props });

    const item = container.querySelector(".half-border-right");
    expect(item).toBeInTheDocument();
  });

  it("renders half a left border when it is center alignment and the last item of the stepper", async () => {
    const props = {
      position: "last",
    };
    const { container } = renderComponent({ props });

    const item = container.querySelector(".half-border-left");
    expect(item).toBeInTheDocument();
  });
});
