import React, { useState } from "react";
import { useForm, useAlert } from "./customHooks";
import Input from "./Input";

const App = () => {
    const [showAlert, toggleAlert] = useAlert();
    const [ values, inValid, changeValue, onBlur, onSubmit, pending, validating] = useForm(
        { name: "", lastname: "", email: "" },
        { lastname: true}, // async field
        toggleAlert,
    );
    return (
        <>
            {showAlert && <div className="alert alert-success" role="alert">Your data sended</div>}
            <form onSubmit={onSubmit} className="container">
                <Input
                    label="Name"
                    value={values.name}
                    name="name"
                    onChange={changeValue}
                    onBlur={onBlur}
                    inValid={inValid.name}
                >
                    <div className="invalid-feedback">{inValid.name}</div>
                </Input>
                <Input
                    label="Last Name"   
                    value={values.lastname}
                    name="lastname"
                    onChange={changeValue}
                    onBlur={onBlur}
                    inValid={inValid.lastname}
                >
                    <div className="invalid-feedback">{inValid.lastname}</div>
                    {pending.lastname && <div className="spinner-border text-success" role="status" />}
                </Input>
                <Input
                    label="Email"
                    value={values.email}
                    name="email"
                    onChange={changeValue}
                    onBlur={onBlur}
                    inValid={inValid.email}
                >
                    <div className="invalid-feedback">{inValid.email}</div>
                </Input>
                <button type="submit" disabled={validating}>Submit</button>
            </form>
        </>
    )
};

export default App;