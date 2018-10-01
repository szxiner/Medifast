import React from "react";
import { expect } from "chai";
import { render } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

import TextInput from "./TextInput";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

it("renders button", () => {
  const wrapper = render(
    <TextInput input="phone" label="Phone Number" type="text" />
  );
  expect(wrapper.text()).to.contain("Phone Number");
});
