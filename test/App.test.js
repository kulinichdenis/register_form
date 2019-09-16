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
    });
    it("submit value from form", async () => {
        wrapper.find('input[name="name"]').simulate("blur");
        wrapper.find('input[name="email"]').simulate("blur");
        act(() => {
            wrapper.find('input[name="lastname"]').simulate("blur");
          });
        //await new Promise((res) => setTimeout(res, 4000));
        expect(wrapper.find('.is-invalid').length).toBe(2);
    });
    it("test async validation", () => {

    });
})
