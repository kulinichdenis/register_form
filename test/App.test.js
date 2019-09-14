import React from "react";
import App from "../src/app/App";
import { mount, shallow } from "enzyme";

describe("App component", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<App />);
    });
    it("render form and button", () => {
        const button = wrapper.find("button").length;
        const form = wrapper.find("form").length;
        expect(form).toBe(1);
        expect(button).toBe(1);
    });
    it("submit value from form", () => {
        wrapper.find('input[name="name"]').simulate("blur");
        wrapper.find('input[name="email"]').simulate("blur");
        expect(wrapper.find('.is-invalid').length).toBe(2);
    });
})
