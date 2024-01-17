import * as React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";

import Auth from "../utils/auth";
export const Register = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  // New state for storing error message
  const [errorMessage, setErrorMessage] = useState("");
  const [createUser, { error, data }] = useMutation(ADD_USER);

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

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      setErrorMessage("Error: " + e.message + error);
      console.error(e);
    }

    // clear form values
    setFormState({
      name: "",
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
                type="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Enter name"
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

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
          <Button
            onClick={handleFormSubmit}
            style={{ backgroundColor: "pink" }}
            className="buttonBlue"
            variant="outline-dark"
          >
            Register
          </Button>
        </Container>
      </Container>
    </>
  );
};
