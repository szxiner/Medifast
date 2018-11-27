import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

import LandingNavBar from "./LandingNavBar";
import { Link } from "react-router-dom";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

it("renders button", () => {
  const wrapper = shallow(<LandingNavBar />);
  expect(wrapper.contains(<Link to="/" />));
  expect(wrapper.contains(<Link to="/login" />));
  expect(wrapper.contains(<Link to="/register" />));
});
