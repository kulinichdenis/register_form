import React, { useState } from "react";
import useForm from "./useForm";
import Input from "./Input";
import useAlert from "./useAlert";

const App = () => {
    const [showAlert, toggleAlert] = useAlert();
    const [
        values,
        valid,
        changeValue,
        onBlur,
        onSubmit,
        pending,
        validating
    ] = useForm(
        { name: "", lastname: "" },
        { lastname: true},
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
                    valid={valid.name}
                />
                <Input
                    label="Last Name"   
                    value={values.lastname}
                    name="lastname"
                    onChange={changeValue}
                    onBlur={onBlur}
                    valid={valid.lastname}
                >
                    {pending.lastname && <div className="spinner-border text-success" role="status" />}
                </Input>
                <button disabled={validating}>Submit</button>
            </form>
        </>
    )
};

export default App;
