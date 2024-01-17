import "@testing-library/jest-dom";
import { createRouter, createMemoryHistory } from "vue-router";
import { render } from "@testing-library/vue";
import Breadcrumb from "../Breadcrumb.vue";

const initialProps = {
  startName: "Dashboard",
};

const routes = [
  {
    path: "",
    component: {
      template: "<div>home</div>",
    },
  },
  {
    path: "/envelopes",
    name: "Envelopes",
    component: {
      template: "<div>envelopes</div>",
    },
    children: [
      {
        path: "create",
        name: "Create",
        component: {
          template: "<div>create</div>",
        },
        meta: {
          displayName: "Create Envelope",
        },
      },
      {
        path: ":id/edit",
        name: "Edit Envelope",
        component: {
          template: "<div>edit</div>",
        },
      },
      {
        path: ":id",
        name: "View Envelope",
        component: {
          template: "<div>view</div>",
        },
        meta: {
          useParamsForDisplay: true,
        },
      },
    ],
  },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const renderComponent = (options) =>
  render(Breadcrumb, { ...options, global: { plugins: [router] } });

describe("Breadcrumb", () => {
  it("renders a semantic nav element", async () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });
    await router.isReady();

    const nav = queryByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("renders an image when an icon is provided", async () => {
    const props = { ...initialProps, iconSrc: "icon" };
    const { queryByRole } = renderComponent({ props });
    router.push("/envelopes/create");
    await router.isReady();

    const img = queryByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("renders the correct number of breadcrumbs", async () => {
    const props = initialProps;
    const { queryAllByRole } = renderComponent({ props });
    router.push("/envelopes/create");
    await router.isReady();

    const links = queryAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("renders the last item as active", async () => {
    const props = initialProps;
    const { queryAllByRole } = renderComponent({ props });
    router.push("/envelopes/create");
    await router.isReady();

    const links = queryAllByRole("link");
    expect(links[2]).toHaveClass("router-link-active");
  });

  describe("when a display name is provided", () => {
    it("renders the correct text title-cased", async () => {
      const props = initialProps;
      const { getByText } = renderComponent({ props });
      router.push("/envelopes/create");
      await router.isReady();

      const navLink = getByText("Create Envelope");
      expect(navLink).toBeInTheDocument();
    });
  });

  describe("when there is not a display name", () => {
    describe("when useParamsForDisplay is true", () => {
      it("renders the correct text title-cased", async () => {
        const props = initialProps;
        const { getByText } = renderComponent({ props });
        router.push("/envelopes/23");
        await router.isReady();

        const navLink = getByText("23");
        expect(navLink).toBeInTheDocument();
      });
    });

    describe("when useParamsForDisplay is false", () => {
      it("renders the correct text title-cased", async () => {
        const props = initialProps;
        const { getByText } = renderComponent({ props });
        router.push("/envelopes/23/edit");
        await router.isReady();

        const navLink = getByText("Edit Envelope");
        expect(navLink).toBeInTheDocument();
      });
    });
  });

  describe("when the path portion has a param", () => {
    it("interpolates the param into the route path", async () => {
      const props = initialProps;
      const { getByText } = renderComponent({ props });
      router.push("/envelopes/23");
      await router.isReady();

      const navLink = getByText("23");
      expect(navLink).toHaveAttribute("href", "/envelopes/23");
    });
  });
});
