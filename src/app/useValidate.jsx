import React, { useState, useMemo } from 'react';
import { validation } from "./utils/validate";
import { defer } from 'rxjs';

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

let sub$;
const useValidate = (values, asyncField) => {
    const defaultValidation = useMemo(() => {
        return Object.keys(values).reduce((object, key) => { 
            object[key] = null;
            return object;
        }, {});
    }, []);

    const [pending, setPending] = useState({ lastname: false });
    const [inValid, setInValid] = useState(defaultValidation); 
    const [validating, setValidating] = useState(false);
    const clearValidate = () => setInValid(defaultValidation);

    const syncValidation = (name) => {
        setInValid((prevValid) => ({...prevValid, [name]: validation(name, values[name])}));
    }

    const _asyncValidation = async (name) => {
        let status = false;
        setPending((prevPeding) => ({...prevPeding, [name]: true}));
        setValidating((prevStatus) => !prevStatus);
        setInValid((prevValid) => ({...prevValid, [name]: null}));
        const result = await validation(name, values[name]);
        if (result) {
            try {
               status = await validIBAN(values[name]);
            } catch(e) {
                // error setError;
            }
        }
        setPending((prevPeding) => ({...prevPeding, [name]: false}));
        setValidating((prevStatus) => !prevStatus); 
        setInValid((prevValid) => ({...prevValid, [name]: status}));
    }

    const asyncValidation = (name) => {
        if (sub$) { sub$.unsubscribe(); }
        sub$ = defer(async () => {
            let status;
            setPending((prevPending) => ({...prevPending, [name]: true}));
            setValidating((prevStatus) => !prevStatus);
            setInValid((prevValid) => ({...prevValid, [name]: null}));
            const result = validation(name, values[name]);
            if (!result) {
                try {
                    status = await validIBAN(values[name]);
                } catch(e) {
                    throw new Error(e);
                }
            } else {
                throw result;
            }
            return status;
        }).subscribe({
            next: (result) => {
                setInValid((prevValid) => ({...prevValid, [name]: !result}));
                setValidating((prevStatus) => !prevStatus);
                setPending((prevPeding) => ({...prevPeding, [name]: false }));
            },
            error: (error) => {
                setInValid((prevValid) => ({...prevValid, [name]: error }));
                setValidating((prevStatus) => !prevStatus);
                setPending((prevPeding) => ({...prevPeding, [name]: false }));
            }
        });
    }

    const validate = (name) => {
        if (asyncField[name]) {
            asyncValidation(name); 
        } else {
            syncValidation(name);
        }
    }

    const validatingAllFields = async () => {
        const keys = Object.keys(inValid);
        for (let i = 0; i < keys.length; i++) {
            const name = keys[i]; 
            if (!inValid[name]) { setInValid((prevInValid) => ({...prevInValid, [name]: true})); }
        }
    }
    
    return [inValid, validate, clearValidate, validating, pending, validatingAllFields];
}

export default useValidate;