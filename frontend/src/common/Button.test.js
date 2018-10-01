import React from "react";
import { expect } from "chai";
import { render } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

import Button from "./Button";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

it("renders button", () => {
  const wrapper = render(<Button name="testName" />);
  expect(wrapper.text()).to.contain("testName");
});
