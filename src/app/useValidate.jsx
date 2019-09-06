import React, { useState, useMemo } from 'react';
// import { validation } from "./utils/validate";

const validation = (name, value) => {
    switch(name) {
        case "name":
            return value.length > 4 ? true : false;
        case "lastname":
            return value.length > 4 ? true : false;
        default:
            return false;
    }
}

const validIBAN = async (value) => {
    try {
      const result = await fetch("http://localhost:3050", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ iban: value }),
      });
      return result.json();
    } catch(e) {
      throw new Error(e);
    }
  };

const mockServer = (timer, value) => new Promise((res) => setTimeout(() => res(value), timer));

const useValidate = (values, asyncField) => {
    const defaultValidation = useMemo(() => {
        return Object.keys(values).reduce((object, key) => { 
            object[key] = null;
            return object;
        }, {});
    }, []);
    const [pending, setPending] = useState({ lastname: false });
    const [valid, setValid] = useState(defaultValidation); 
    const [validating, setValidating] = useState(false);

    const clearValidate = () => setValid(defaultValidation);

    const syncValidation = (name) => {
        setValid((prevValid) => ({...prevValid, [name]: validation(name, values[name])}));
    }

    const asyncValidation = async (name) => {
        let status = false;
        setPending((prevPeding) => ({...prevPeding, [name]: true}));
        setValidating((prevStatus) => !prevStatus);
        setValid((prevValid) => ({...prevValid, [name]: null}));
        const result = await validation(name, values[name]);

        if (result) {
            try {
                status = await mockServer(4000, true);
            } catch(e) {
                // error setError set here;
            }
        }
        
        setPending((prevPeding) => ({...prevPeding, [name]: false}));
        setValidating((prevStatus) => !prevStatus); 
        setValid((prevValid) => ({...prevValid, [name]: status}));
    }

    const validate = (name) => {
        if (asyncField[name]) {
            asyncValidation(name); 
        } else {
            syncValidation(name);
        }  
    }

    const validatingAllFields = async () => {
        const keys = Object.keys(values);
        for (let i = 0; i < keys.length; i++) {
            if (valid[keys[i]]) {
                continue;
            }
            if (asyncField[keys[i]]) {
                await asyncValidation(keys[i]);
            } else {
                syncValidation(keys[i]);
            }
        }
    }

    return [valid, validate, clearValidate, validating, pending, validatingAllFields];
}

export default useValidate;