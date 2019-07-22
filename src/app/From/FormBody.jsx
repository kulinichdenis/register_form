import React from "react";
import { Field } from "react-final-form";
import IbanField from "./Fields/IbanField";
import { ibanValidate } from "./utils/validate";
import { Button, Spinner, Alert, Form } from "react-bootstrap";

const formBody = ({ handleSubmit, values, form }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Form.Group controlId="groupFirstname">
        <Form.Label>First name</Form.Label>
        <Field name="firstname">
          {({ input, meta }) => (
            <div>
              <input {...input} className="form-control" type="text" placeholder="First Name" />
              {meta.error && meta.touched && <small>{meta.error}</small>}
            </div>
          )}
        </Field>
      </Form.Group>
      <Form.Group controlId="groupLastname">
      <Form.Label>Last name</Form.Label>
      <Field name="lastname">
        {({ input, meta }) => (
          <div>
            <input {...input} className="form-control" type="text" placeholder="Last Name" />
              {meta.error && meta.touched && <small>{meta.error}</small>}
          </div>
         )}
      </Field>
      </Form.Group>
      <Form.Group controlId="groupEmail">
      <Form.Label>Email</Form.Label>
      <Field name="email" >
        {({ input, meta }) => (
          <div>
            <input {...input} className="form-control" type="text" placeholder="Email" />
            {meta.error && meta.touched && <small>{meta.error}</small>}
          </div>
        )}
      </Field>
      </Form.Group>
      <Form.Group controlId="groupIban">
      <Form.Label>IBAN</Form.Label>
        <IbanField name="iBan" validate={ibanValidate}>
            {({ input, meta }) => (
              <div className="iban">
                <input {...input} className="form-control" type="text" placeholder="IBAN" />
                {meta.error && meta.touched && <small>{meta.error}</small>}
                {meta.validating && meta.active &&
                <Spinner className="spinner" as="span" animation="border" variant="primary" />}
              </div>)
            }
        </IbanField>
      </Form.Group>
      <div className="group-button">
      <Button type="submit">Submit</Button>
      <Button onClick={form.reset} type="submit">Reset</Button>
      </div>
      <pre>
        <Alert variant="dark">
          {JSON.stringify(values, 0, 2)}
        </Alert>
      </pre>
    </form>
  )
};

export { formBody }
