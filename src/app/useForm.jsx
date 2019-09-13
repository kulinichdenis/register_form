import React, { useState } from 'react'
import useValidate from "./useValidate";

const useForm = (defaultValues, asyncField, callback) => {
    const [values, setValues] = useState(defaultValues);
    const [inValid, validate, clearValidate, validating, pending, validatingAllFields] = useValidate(values, asyncField);

    const validAllFields = () => {
        const keys = Object.keys(inValid);
        if (!keys.length) return false;
        return keys.every((key) => inValid[key] === true);
    }
    
    const clearAllFields = () => setValues({...defaultValues});
    const onBlur = ({ target: { name } }) => validate(name);

    const changeValue = (event) => {
        event.persist();
        const { target: { name, value }} = event;
        setValues((values) => ({ ...values, [name]: value }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        validatingAllFields();
        if (validAllFields()) { 
            clearValidate();
            clearAllFields();
            callback();
        }
    };
    return [values, inValid, changeValue, onBlur, onSubmit, pending, validating];
}

export default useForm
