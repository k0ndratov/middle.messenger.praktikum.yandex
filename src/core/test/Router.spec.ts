import { Router } from "../Router";
import Block from "../Block";

class MyComponent extends Block<Record<string, unknown>> {}

const spyOnPushState = jest.spyOn(window.history, "pushState");

describe("Router", () => {
  let router: Router;

  const createRouter = () => {
    router = new Router();
  };

  it("should create a new router", () => {
    createRouter();

    const instanceofRoute = router instanceof Router;
    expect(instanceofRoute).toBe(true);
  });

  it("should have an empty routes array", () => {
    createRouter();

    expect(router.routes).toHaveLength(0);
  });

  it("should add a new route", () => {
    createRouter();

    router.use("/new-route", MyComponent, false);
    expect(router.routes[0].path).toBe("/new-route");
  });

  it("should navigate to a route", () => {
    createRouter();

    router.use("/new-route", MyComponent, false);
    router.go("/new-route");
    expect(spyOnPushState).toHaveBeenCalled();
  });
});
