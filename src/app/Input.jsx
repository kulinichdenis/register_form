import React from 'react'

const Input = ({ name, onChange, label, value, onBlur, inValid, children }) => {
    const validClass = inValid ? "is-invalid" : inValid !== null ? "is-valid" : "";
    return (
        <div className="row col-8">
           <label htmlFor={name}>{label}</label>
           <input
                className={`form-control ${validClass}`}
                name={name}
                value={value}
                type="text"
                onBlur={onBlur}
                onChange={onChange}
            />
                {children}
        </div>
    )
}

export default Input;
