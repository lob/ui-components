import "@testing-library/jest-dom";
import { createRouter, createMemoryHistory } from "vue-router";
import { render } from "@testing-library/vue";
import SubnavigationItem from "../SubnavigationItem.vue";

const initialProps = {
  title: "Account",
  to: "/account",
};
const routes = [
  { path: "", component: { template: "<div></div>" } },
  { path: "/", component: { template: "<div>/</div>" } },
  { path: "/account", component: { template: "<div>Account</div>" } },
  { path: "/api-keys", component: { template: "<div>API Keys</div>" } },
  { path: "/payment", component: { template: "<div>Payment</div>" } },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const renderComponent = (options) =>
  render(SubnavigationItem, { ...options, global: { plugins: [router] } });

describe("SubnavigationItem", () => {
  it("renders correctly", async () => {
    const { queryByText, queryByRole } = renderComponent({
      props: initialProps,
    });
    await router.isReady();

    let item = queryByText(initialProps.title);
    expect(item).toBeInTheDocument();

    item = queryByRole("link");
    expect(item).toBeInTheDocument();
  });

  it("adds the correct classes when the item is active", async () => {
    const { queryByRole } = renderComponent({ props: initialProps });
    router.push("/account");
    await router.isReady();

    const navItem = queryByRole("link", { name: "Account" });
    expect(navItem).toHaveClass("!text-black");
  });

  it("adds the correct classes when the item is disabled", () => {
    const { queryByRole } = renderComponent({
      props: { ...initialProps, disabled: true },
    });

    const navItem = queryByRole("link", { name: "Account" });
    expect(navItem).toHaveClass("!text-gray-300");
  });
});
