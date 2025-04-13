import { expect } from "chai";
import { Button } from "./Button";

describe("Button Component", () => {
  it("should render button with default props", () => {
    const button = new Button({
      attr: {},
      text: "Click me",
      onClick: () => {},
    });

    const element = button.getContent() as HTMLButtonElement;
    const trimmedText = element.textContent?.trim();
    expect(element.tagName).to.equal("BUTTON");
    expect(trimmedText).to.equal("Click me");
    expect(element.disabled).to.be.false;
  });

  it("should render button with custom props", () => {
    const button = new Button({
      attr: {
        id: "test-button",
        className: "custom-class",
        type: "submit",
        disabled: true,
      },
      text: "Submit",
      onClick: () => {},
    });

    const element = button.getContent() as HTMLButtonElement;
    expect(element.id).to.equal("test-button");
    expect(element.className).to.equal("custom-class");
    expect(element.type).to.equal("submit");
  });

  it("should handle click events", () => {
    let clicked = false;
    const button = new Button({
      attr: {},
      text: "Click me",
      onClick: () => {
        clicked = true;
      },
    });

    const element = button.getContent() as HTMLButtonElement;
    element.click();
    expect(clicked).to.be.true;
  });
});
