import React from "react";
import { Field } from "react-final-form";

class IbanField extends React.Component {
  validate = (value, allValues, meta) => {
    if(value !== this.lastValue) {
      this.lastValue = value;
      return new Promise(resolve => {
        if (this.clearTimeout) this.clearTimeout();
        const timerId = setTimeout(() => {
          resolve(this.props.validate(value));
        }, 1000);
        this.clearTimeout = () => {
          clearTimeout(timerId);
          resolve();
        };
      })
    } else {
      return meta.error;
    }
  };
  render() {
    return <Field {...this.props} validate={this.validate} />;
  }
}

export default IbanField;
