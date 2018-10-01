import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

import Landing from "./Landing";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

it("renders button", () => {
  const wrapper = shallow(<Landing />);
  expect(wrapper.contains(<div data-it="landing" />));
});
