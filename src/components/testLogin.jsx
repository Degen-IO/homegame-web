import * as React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

function TestLogin() {
  const [formState, setFormState] = useState({ email: "", password: "" }); // store email and password in formState
  //login function, destructure error and data from payload
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  // submit form (submit button)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    // lets try to login, call the login mutation, pass in formState (state variable holding variables for email & password)
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token); //  calls login method from auth, pass in the token (from local storage)
      console.log("YOU GOT LOGGED IN");
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <Container className="darkbackground w100 container">
        <Container className="p-3 my-5 d-flex flex-column w-50">
          <Col>
            <Row>
              <Form.Control
                className="formInput"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Row>
            <Row>
              <Form.Control
                className="formInput"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </Row>
          </Col>

          <div className="d-flex justify-content-between mx-3 mb-4">
            <Form.Check type="checkbox" label="Check me out" />
            <a href="!#">Forgot password?</a>
          </div>

          <Button
            onClick={handleFormSubmit}
            style={{ backgroundColor: "#337ca0" }}
            className="buttonBlue"
            variant="outline-dark"
          >
            Sign in
          </Button>
        </Container>
      </Container>
    </>
  );
}

export default TestLogin;
