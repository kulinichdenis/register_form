import React, { Component } from "react";
import { Form } from "react-final-form";
import { formBody } from "./FormBody";
import { onSubmit } from "./utils/submit";
import { validateFiels } from "./utils/validate";
import { Container, Row, Col, Alert } from 'react-bootstrap';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { message: false };
  }

  handleSubmit = (values) => {
    onSubmit(values);
    this.setState({ message: true}, () => {
      setTimeout(() => this.setState({ message: false }), 3000);
    })
  }
  
  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
          {this.state.message &&
            <Alert variant="primary">
              All data is valid
            </Alert>
          }
          <h2>Register Form</h2>
            <Form
              onSubmit={this.handleSubmit}
              render={formBody}
              validate={validateFiels}
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>)
  }
}

export { RegisterForm };
