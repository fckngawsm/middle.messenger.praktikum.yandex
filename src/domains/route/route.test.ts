import { expect } from "chai";
import { NotFoundStrategy } from "../pages/NotFoundStrategy";
import { router } from "./Router";
import { Routes } from "./routes";

describe("Testing Router", () => {
  it("Router should return the same instance when called getInstance", () => {
    const router1 = router;
    const router2 = router;
    const router3 = router;

    expect(router1).to.equal(router2);
    expect(router1).to.equal(router3);
    expect(router2).to.equal(router3);
  });

  it("Router should return undefined for non-existent routes", () => {
    expect(router.getRoute("/non-existent-route")).to.be.undefined;
  });

  it("Router should handle NotFound route correctly", () => {
    router.use(Routes.NOT_FOUND, new NotFoundStrategy());
    expect(router.getRoute(Routes.NOT_FOUND)).to.be.not.undefined;
    expect(router.getRoute(Routes.HOME)).to.be.undefined;
  });

  it("Router should correctly navigate", () => {
    expect(window.history.length).to.equal(1);
    router.go(Routes.NOT_FOUND);
    expect(window.history.length).to.equal(2);
  });
});
