import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/vue";
import ToggleButton from "../ToggleButton.vue";

const initialProps = {
  modelValue: false,
  name: "Test name",
  label: "Test",
  error: false,
  disabled: false,
};

const renderComponent = (options) => render(ToggleButton, { ...options });

describe("ToggleButton", () => {
  it("renders correctly", () => {
    const props = {
      ...initialProps,
    };

    const { queryByText, queryByLabelText } = renderComponent({ props });

    const label = queryByText(props.label);
    expect(label).toBeInTheDocument();
    const toggleButton = queryByLabelText(props.label);
    expect(toggleButton).toBeInTheDocument();
  });

  it("disables the input when disabled prop is true", () => {
    const props = {
      ...initialProps,
      disabled: true,
    };

    const { getByLabelText } = renderComponent({ props });

    const toggleButton = getByLabelText(props.label);
    expect(toggleButton).toBeDisabled();
  });

  it("requires the input when required prop is true", () => {
    const props = {
      ...initialProps,
      required: true,
    };

    const { getByLabelText } = renderComponent({ props });

    const toggleButton = getByLabelText(new RegExp(props.label));
    expect(toggleButton).toBeRequired();
  });

  it("adds an error class when error prop is true", () => {
    const props = {
      ...initialProps,
      error: true,
    };

    const { getByTestId } = renderComponent({ props });

    const toggle = getByTestId("toggle");
    expect(toggle).toHaveClass("!border-error");
  });

  it("fires the input event when the input is clicked", async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = renderComponent({ props });

    const toggleButton = getByLabelText(props.label);

    await fireEvent.click(toggleButton);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("input");
    expect(emittedEvent.input[0]).toEqual([true]);
    expect(toggleButton).toBeChecked();
  });

  it("fires the click event when the input is clicked", async () => {
    const props = initialProps;
    const { getByLabelText, emitted } = renderComponent({ props });

    const toggleButton = getByLabelText(props.label);

    await fireEvent.click(toggleButton);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty("click");
  });

  describe("when the v-model is a simple boolean", () => {
    describe("when the v-model is false", () => {
      it("does not check the input", () => {
        const props = initialProps;
        const { getByLabelText } = renderComponent({ props });

        const toggleButton = getByLabelText(props.label);
        expect(toggleButton).not.toBeChecked();
      });

      it("emits an input event with the value true when clicked", async () => {
        const props = initialProps;
        const { getByLabelText, emitted } = renderComponent({ props });

        const toggleButton = getByLabelText(props.label);

        await fireEvent.click(toggleButton);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty("input");
        expect(emittedEvent.input[0]).toEqual([true]);
        expect(toggleButton).toBeChecked();
      });
    });

    describe("when the v-model is true", () => {
      it("checks the input when the v-model is true", () => {
        const props = {
          ...initialProps,
          modelValue: true,
        };
        const { getByLabelText } = renderComponent({ props });

        const toggleButton = getByLabelText(props.label);
        expect(toggleButton).toBeChecked();
      });

      it("emits an input event with the value true when clicked", async () => {
        const props = {
          ...initialProps,
          modelValue: true,
        };
        const { getByLabelText, emitted } = renderComponent({ props });

        const toggleButton = getByLabelText(props.label);

        await fireEvent.click(toggleButton);
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty("input");
        expect(emittedEvent.input[0]).toEqual([false]);
        expect(toggleButton).not.toBeChecked();
      });
    });
  });

  describe("when the v-model is an array", () => {
    it("does not check the input when the v-model does not contain the value", () => {
      const props = {
        ...initialProps,
        value: "test",
        modelValue: ["not test", "also not test"],
      };

      const { getByLabelText } = renderComponent({ props });

      const toggleButton = getByLabelText(props.label);
      expect(toggleButton).not.toBeChecked();
    });

    it("checks the input when the v-model does contain the value", () => {
      const props = {
        ...initialProps,
        value: "test",
        modelValue: ["not test", "test"],
      };
      const { getByLabelText } = renderComponent({ props });

      const toggleButton = getByLabelText(props.label);
      expect(toggleButton).toBeChecked();
    });

    it("emits an input event that contains value of the toggle button when clicked", async () => {
      const props = {
        ...initialProps,
        value: "test",
        modelValue: ["not a test"],
      };
      const { getByLabelText, emitted } = renderComponent({ props });

      const toggleButton = getByLabelText(props.label);

      await fireEvent.click(toggleButton);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty("input");
      expect(emittedEvent.input[0][0]).toContain("test");
      expect(toggleButton).toBeChecked();
    });
  });
});
