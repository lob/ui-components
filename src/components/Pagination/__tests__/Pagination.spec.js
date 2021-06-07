import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/vue";
import Pagination from "../Pagination.vue";

const initialProps = {
  collection: [{}],
  page: 1,
  total: 30,
  limit: 10,
};

describe("Pagination", () => {
  describe("when the first page is active", () => {
    let props;

    beforeEach(() => {
      props = initialProps;
    });

    it("disables the first page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /first page/i });
      expect(button).toBeDisabled();
    });

    it("disables the previous page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /previous page/i });
      expect(button).toBeDisabled();
    });

    it("does not disable the next page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /next page/i });
      expect(button).not.toBeDisabled();
    });

    it("does not disable the last page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /last page/i });
      expect(button).not.toBeDisabled();
    });
  });

  describe("when a middle page is active", () => {
    let props;

    beforeEach(() => {
      props = {
        ...initialProps,
        page: 2,
      };
    });

    it("does not disable the first page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /first page/i });
      expect(button).not.toBeDisabled();
    });

    it("does not disable the previous page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /previous page/i });
      expect(button).not.toBeDisabled();
    });

    it("does not disable the next page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /next page/i });
      expect(button).not.toBeDisabled();
    });

    it("does not disable the last page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /last page/i });
      expect(button).not.toBeDisabled();
    });
  });

  describe("when the last page is active", () => {
    let props;

    beforeEach(() => {
      props = {
        ...initialProps,
        page: 3,
      };
    });

    it("does not disable the first page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /first page/i });
      expect(button).not.toBeDisabled();
    });

    it("does not disable the previous page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /previous page/i });
      expect(button).not.toBeDisabled();
    });

    it("disables the next page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /next page/i });
      expect(button).toBeDisabled();
    });

    it("disables the last page button", () => {
      const { getByRole } = render(Pagination, { props });

      const button = getByRole("button", { name: /last page/i });
      expect(button).toBeDisabled();
    });
  });

  describe("when there are no results", () => {
    it("does not render pagination at all", () => {
      const props = {
        ...initialProps,
        collection: null,
      };

      const { queryByText } = render(Pagination, { props });

      expect(queryByText(/result/i)).toBeNull();
    });
  });

  describe("paging events", () => {
    let props;

    beforeEach(() => {
      props = {
        ...initialProps,
        page: 2,
      };
    });

    it("emits an event with the first page data when first page button is clicked", async () => {
      const { getByRole, emitted } = render(Pagination, { props });

      const button = getByRole("button", { name: /first page/i });

      await fireEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty("change");
      expect(emittedEvent.change[0][0].page).toEqual(1);
    });

    it("emits an event with the previous page data when previous page button is clicked", async () => {
      const { getByRole, emitted } = render(Pagination, { props });

      const button = getByRole("button", { name: /previous page/i });

      await fireEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty("change");
      expect(emittedEvent.change[0][0].page).toEqual(1);
    });

    it("emits an event with the next page data when next page button is clicked", async () => {
      const { getByRole, emitted } = render(Pagination, { props });

      const button = getByRole("button", { name: /next page/i });

      await fireEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty("change");
      expect(emittedEvent.change[0][0].page).toEqual(3);
    });

    it("emits an event with the last page data when last page button is clicked", async () => {
      const { getByRole, emitted } = render(Pagination, { props });

      const button = getByRole("button", { name: /last page/i });

      await fireEvent.click(button);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty("change");
      expect(emittedEvent.change[0][0].page).toEqual(3);
    });
  });
});
