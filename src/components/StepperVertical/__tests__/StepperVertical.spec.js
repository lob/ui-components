import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import StepperVertical from "../StepperVertical.vue";

const initialProps = {
  activeStepIndex: 0,
  steps: [
    {
      path: "/settings",
      displayName: "Configure settings",
      pathName: "Create Campaign Step One",
    },
    {
      path: "/audience",
      displayName: "Add audience",
      pathName: "Create Campaign Step Two",
    },
    {
      path: "/creative",
      displayName: "Choose creative",
      pathName: "Create Campaign Step Three",
    },
    {
      path: "/confirm",
      displayName: "Review campaign",
      pathName: "Create Campaign Step Four",
    },
  ],
};

const renderComponent = (options) => render(StepperVertical, { ...options });

describe("StepperVertical", () => {
  it("renders the steps pathNames", () => {
    const props = initialProps;
    const { getByText } = renderComponent({ props });

    const step1 = getByText(props.steps[0].displayName);
    const step2 = getByText(props.steps[1].displayName);
    const step3 = getByText(props.steps[2].displayName);
    const step4 = getByText(props.steps[3].displayName);
    expect(step1).toBeInTheDocument();
    expect(step2).toBeInTheDocument();
    expect(step3).toBeInTheDocument();
    expect(step4).toBeInTheDocument();
  });

  it("the first step is active by default", () => {
    const props = initialProps;
    const { getByText } = renderComponent({ props });

    const step1 = getByText(props.steps[0].displayName).closest("div");
    expect(step1).toHaveClass("bg-primary-500");
  });

  describe("activeStep passed by prop", () => {
    const props = {
      ...initialProps,
      activeStep: initialProps.steps[2],
    };

    it("the currentStep is active", () => {
      const { getByText } = renderComponent({ props });

      const step3 = getByText(props.steps[2].displayName).closest("div");
      expect(step3).toHaveClass("bg-primary-500");
    });
  });

  describe("clicking on a step", () => {
    let component;
    let props;
    let step2;
    beforeEach(async () => {
      props = initialProps;
      component = renderComponent({ props });
      const { getByText } = component;
      step2 = getByText(props.steps[1].displayName).closest("div");
      await userEvent.click(step2);
    });

    it("emits the step", () => {
      const { emitted } = component;

      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty("goToStep");
      expect(emittedEvent.goToStep[0]).toEqual([props.steps[1]]);
    });

    it("the step clicked-on becomes active", () => {
      expect(step2).toHaveClass("bg-primary-500");
    });
  });
});
