import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

import { Login } from "./Login";
import { FormGroup, FormControl } from "react-bootstrap";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

it("renders button", () => {
  const wrapper = shallow(<Login authenticateUser={() => {}} />);
  expect(wrapper.contains(<FormGroup />));
  expect(wrapper.contains(<FormControl />));
});
