import React from 'react'

const Input = ({ name, onChange, label, value, onBlur, valid, children }) => {
    const validClass = valid === true ? "is-valid" : valid === false ? "is-invalid" : ""; 
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
