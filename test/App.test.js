import React from "react";
import App from "../src/app/App";
import { act } from "react-dom/test-utils";
import { mount, shallow } from "enzyme";
import * as validation from "../src/app/utils/validate";
import { delay } from "../src/app/utils/utils";

validation.validIBAN = jest.fn(() => Promise.resolve(true));

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

    it("should all fields is invalid", async () => {
        wrapper.find('input[name="name"]').simulate("blur");
        wrapper.find('input[name="email"]').simulate("blur");
        await act(async() => {
           wrapper.find('input[name="lastname"]').simulate("blur");
        });
        act(() => { wrapper.update();});
        expect(wrapper.find('.is-invalid').length).toBe(3);
    });

    describe("validate values and submit form", () => {
        let name;
        let email;
        let lastname;
        beforeEach(async () => {
            name = wrapper.find('input[name="name"]').simulate('change', { target: { value: "Denys", name: "name"}});
            name.simulate('blur');
            email = wrapper.find('input[name="email"]').simulate('change', { target: { value: "test@test.com", name: "email"}});
            email.simulate('blur');
            lastname = wrapper.find('input[name="lastname"]').simulate('change', { target: { value: "Kulinich", name: "lastname"}});
            await act(async () => { lastname.simulate('blur'); });
            wrapper.update();
        });

        it("validation input values", async() => {
            expect(wrapper.find('input[name="name"]').props().value).toEqual("Denys");
            expect(wrapper.find('input[name="email"]').props().value).toEqual("test@test.com");
            expect(wrapper.find('input[name="lastname"]').props().value).toEqual("Kulinich");
            expect(wrapper.find('.is-valid').length).toBe(3);
        });

        it("submited form", async() => {
            wrapper.find('form').simulate('submit');
            expect(wrapper.find('input[name="name"]').props().value).toEqual("");
            expect(wrapper.find('input[name="email"]').props().value).toEqual("");
            expect(wrapper.find('input[name="lastname"]').props().value).toEqual("");
        });

        it("show and hide alert message", async () => {
            wrapper.find('form').simulate('submit');
            expect(wrapper.find('input[name="name"]').props().value).toEqual("");
            expect(wrapper.find(".alert-success").length).toBe(1);
            await act(async() => { await delay(3000); });
            wrapper.update();
            expect(wrapper.find('.alert-success').length).toBe(0);
        });
    });
})
