import { RenderResult, render } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { Link, LinkProps } from "./Link";

describe(Link.name, () => {
  const dataTestId = "test";

  const mockProps: LinkProps = {
    to: "/test",
    children: "Test",
    dataTestId,
  };

  let renderResult: RenderResult;
  let LinkEle: HTMLElement;

  beforeEach(() => {
    renderResult = render(<Link {...mockProps}>Test</Link>);
    LinkEle = renderResult.getByText("Test");
  });

  it("should render the component with the correct data-testid", () => {
    expect(LinkEle).toBeDefined();
    const dataTestIdAttr = LinkEle.getAttribute("data-testid");
    expect(dataTestIdAttr).toBe(dataTestId);
  });
});
